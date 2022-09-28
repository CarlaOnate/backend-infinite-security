from dis import code_info
from django.http import JsonResponse
from .models import Usuario, Producto, Reserva, Lugar
from django.db.models import Count, Value as V
from django.db.models.functions import Coalesce
from django.contrib.auth.decorators import login_required
from django.core.mail import EmailMessage
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt
from django.core import serializers
from django.core.serializers.json import DjangoJSONEncoder
from datetime import datetime, timedelta
from django.utils import timezone
import random
import json
import string

# Create your views here.
@csrf_exempt
def testingAPI(req):
  return JsonResponse({"msg": "API Running"})

# Historial reservas
  # Admin
@csrf_exempt
def getHistorial(req): # historial reservas -> solo para admins
  if req.user.rol == None: return JsonResponse({"error": "Action not permited"})
  try:
    if req.body != None:
      body_unicode = req.body.decode('utf-8')
      body = json.loads(body_unicode)
      column = body["column"]
      value = body["value"]
      columnText = column + '__contains'
      reservas = Reserva.objects.filter(**{columnText:value}).order_by("fechaInicio").select_related("idUsuario", "idProducto", "idLugar")
      #Format response
      serializedReserva =  reservaJSONResponse(reservas)
      return JsonResponse({"values": serializedReserva}, safe=False)
    else:
      reservas = Reserva.objects.all().order_by("fechaInicio").select_related("idUsuario", "idProducto", "idLugar")
      serializedReserva = reservaJSONResponse(reservas)
      return JsonResponse({"values": serializedReserva}, safe=False)
  except:
      return JsonResponse({ "error": "Campos no validos"})


def reservaJSONResponse(reservas):
  reservaJson = []
  for reserva in reservas:
    productoDict = None
    lugarDict = None
    userDict = {}

    if reserva.idProducto != None:
      productoDict = {
        "id": reserva.idProducto.pk,
        "nombre": reserva.idProducto.nombre,
        "categoria": Producto.PRODUCT_CATEGORIES[reserva.idProducto.categoria][1],
        "cantidadSolicitada": reserva.idProducto.cantidadSolicitada
      }
    if reserva.idLugar != None:
      lugarDict = {
        "id": reserva.idLugar.pk,
        "salon": reserva.idLugar.salon,
        "piso": reserva.idLugar.piso,
      }

    reservaDict = {
      "id": reserva.pk,
      'codigoReserva': reserva.codigoReserva,
      "fechaInicio": reserva.fechaInicio,
      "fechaFinal": reserva.fechaFinal,
      "horaInicio": reserva.horaInicio,
      "horaFinal": reserva.horaFinal,
      "estatus": reserva.estatus,
      "estatusName": Reserva.ESTATUS_ENUM[reserva.estatus][1],
      "comentarios": reserva.comentarios,
      "fechaCreada": reserva.createdAt
    }

    if reserva.idUsuario.rol == None:
      userDict = {
        "nombre": reserva.idUsuario.username,
        "rol": "Usuario",
        "id": reserva.idUsuario.pk
      }
    else:
      userDict = {
        "nombre": reserva.idUsuario.username,
        "rol": Usuario.ROL_ENUM[reserva.idUsuario.rol][1],
        "id": reserva.idUsuario.pk
      }
    reservaJson.append({"reserva": reservaDict, "usuario": userDict, "producto": productoDict, "lugar": lugarDict})
  return reservaJson

# User
@csrf_exempt
@login_required
def getUserHistorial(req): # reservas de 1 usuario o del usuario loggeado
  fields = [ el.name for el in Reserva._meta.get_fields() ]
  if req.POST:
    if req.user.rol == None: return JsonResponse({"error": "Action not permited"})
    userId = req.POST["usuario"]
    user = Usuario.objects.get(pk=userId)
    reservas = Reserva.objects.filter(idUsuario=user).order_by("fechaInicio").datetimes()
    serializedReservas = serializers.serialize('json', reservas)
    return JsonResponse({"values": serializedReservas, "columns": fields}, safe=False)
  elif req.user:
    reservas = Reserva.objects.filter(idUsuario=req.user).order_by("fechaInicio")
    serializedReservas = serializers.serialize('json', reservas)
    return JsonResponse({"values": serializedReservas, "columns": fields}, safe=False)
  else:
    return JsonResponse({"msg": "User not logged in"})

#Edit user or admin
@csrf_exempt
def editUserAdmin(req):
  usuario = Usuario.objects.get(id = req.POST["id"]) #Cambiar por la función de Carla para detectar qe usuario esta logueado

  #En el req debe de venir nombre, rol, departamento, apellidos maternos y paternos

  #Asi se edita un usuario y se edita bien
  nombre = req.POST["name"]
  apellido = req.POST["lastName"]
  apellido2 = req.POST["secondLastName"]
  departamento = req.POST["departament"]
  rol = req.POST["rol"]

  usuario.nombre = nombre
  usuario.apellidoPaterno = apellido
  usuario.apellidoMaterno = apellido2
  usuario.departament = departamento
  usuario.rol = rol

  usuario.username = nombre + ' ' + apellido + ' ' + apellido2

  usuario.save()

  return JsonResponse({"user": usuario.username})

# Recursos - producto o lugar
@csrf_exempt
@login_required
def createRecurso(req):
  if req.user.rol == None: return JsonResponse({"error": "Action not permited"})
  body_unicode = req.body.decode('utf-8')
  body = json.loads(body_unicode)
  if 'resourceType' in body.keys():
    tipoRecurso = body['resourceType']
    if tipoRecurso == "Lugar": return createLugar(body)
    elif tipoRecurso == "Producto": return createProducto(body)
    else: return JsonResponse({"error": "Resource type not valid"})
  else:
    return JsonResponse({"error": "Resource type not present"})

def createLugar(body):
  # Variables must exist in request body
  piso = body['floor'] # 1 to 3
  capacidad = body['capacity']
  detalles = body['details']
  salon = body['room']
  fechaBloqueo = None
  fechaDesbloqueo = None
  # Vars are optional
  if 'blockDate' in body.keys(): fechaBloqueo = body['blockDate']
  if 'unblockDate' in body.keys(): fechaDesbloqueo = body['unblockDate']
  #many to many field
  newLugar = Lugar.objects.create(piso=piso, detalles=detalles, capacidad=capacidad, salon=salon, fechaBloqueo=fechaBloqueo, fechaDesbloqueo=fechaDesbloqueo)
  if 'idProduct' in body.keys():
    idProducto = body['idProduct']
    for el in idProducto:
      producto = Producto.objects.get(pk=el)
      newLugar.idProductos.add(producto) # creates aux table with relations
  return JsonResponse({"user": "Created Lugar successfully"})

def createProducto(body):
  nombre = body["name"]
  detalles = body["details"]
  modelo = body["model"]
  noSerie = body["serialNumber"]
  categoria = body["category"] # 1 to 7
  cantidadTotal = body["qty"]
  tipo = body["type"] # 1 (Soft) 2 (Hard)
  fechaBloqueo = None
  fechaDesbloqueo = None
  # Vars are optional
  if 'blockDate' in body.keys(): fechaBloqueo = body['blockDate']
  if 'unblockDate' in body.keys(): fechaDesbloqueo = body['unblockDate']
  Producto.objects.create(nombre=nombre, detalles=detalles, modelo=modelo, noSerie=noSerie, categoria=categoria, cantidadTotal=cantidadTotal, tipo=tipo, fechaBloqueo=fechaBloqueo, fechaDesbloqueo=fechaDesbloqueo)
  return JsonResponse({"user": "Created Producto successfully"})

@csrf_exempt
def getRecurso(req): # Individual or all resources
  if req.user.rol == None: return JsonResponse({"error": "Action not permited"})
  body_unicode = req.body.decode('utf-8')
  body = json.loads(body_unicode)
  if 'resourceType' in body.keys():
    tipoRecurso = body['resourceType']
    if tipoRecurso == "Lugar": return getLugar(body)
    elif tipoRecurso == "Producto": return getProducto(body)
    else: return JsonResponse({"error": "Resource type not valid"})
  else:
    return JsonResponse({"error": "Resource type not present"})

def getProducto(body):
  if 'id' in body.keys(): #single product
    producto = Producto.objects.get(pk=body['id'])
    serializedProducto = serializers.serialize('json', [producto])
    return JsonResponse({"value": serializedProducto})
  elif 'byCategory' in body.keys():
    returnObj = {}
    for category in Producto.PRODUCT_CATEGORIES:
      productos = Producto.objects.all().filter(deletedAt=None, categoria=category[0]) # return Productes that havent been deleted
      returnObj[category[1]] = serializers.serialize('json', productos)
    serializedProductos = json.dumps([returnObj])
    return JsonResponse({"value": serializedProductos})
  else:
    productos = Producto.objects.all().filter(deletedAt=None) # return products that havent been deleted
    serializedProductos = serializers.serialize('json', productos)
    return JsonResponse({"value": serializedProductos})

def getLugar(body):
  if 'id' in body.keys(): #single product
    lugar = Lugar.objects.get(pk=body['id'])
    serializedLugar = serializers.serialize('json', [lugar])
    return JsonResponse({"value": serializedLugar})
  elif 'byFloor' in body.keys():
    returnObj = {}
    for piso in Lugar.PISOS_ENUM:
      lugares = Lugar.objects.all().filter(deletedAt=None, piso=piso[0]) # return lugares that havent been deleted
      returnObj[piso[0]] = serializers.serialize('json', lugares)
    serializedLugares = json.dumps([returnObj])
    return JsonResponse({"value": serializedLugares})
  else:
    lugares = Lugar.objects.all().filter(deletedAt=None) # return lugares that havent been deleted
    serializedLugares = serializers.serialize('json', lugares)
    return JsonResponse({"value": serializedLugares})


@csrf_exempt
def updateRecurso(req): # Individual or all resources
  if req.user.rol == None: return JsonResponse({"error": "Action not permited"})
  body_unicode = req.body.decode('utf-8')
  body = json.loads(body_unicode)
  if 'resourceType' in body.keys():
    tipoRecurso = body['resourceType']
    if tipoRecurso == "Lugar": return updateLugar(body)
    elif tipoRecurso == "Producto": return updateProducto(body)
    else: return JsonResponse({"error": "Resource type not valid"})
  else:
    return JsonResponse({"error": "Resource type not present"})

def updateProducto(body):
  if 'block' in body.keys(): #single product
    producto = Producto.objects.get(pk=body['id'])
    producto.fechaBloqueo = timezone.make_aware(datetime.fromisoformat(body['blockDate']))
    producto.fechaDesbloqueo = timezone.make_aware(datetime.fromisoformat(body['unblockDate']))
    producto.save()
    return JsonResponse({ "msg": "Actualizado correctamente" })
  else:
    producto = Producto.objects.get(pk=body['id'])
    producto.nombre = body['name']
    producto.detalles = body['details']
    producto.modelo = body['model']
    producto.serialNumber = body['serialNumber']
    producto.categoria = body['category']
    producto.cantidadTotal = body['totalQty']
    producto.tipo = body['type']
    if (body['blockDate'] != None) and (body['unblockDate'] != None): # not null
      producto.fechaBloqueo = timezone.make_aware(datetime.fromisoformat(body['blockDate']))
      producto.fechaDesbloqueo = timezone.make_aware(datetime.fromisoformat(body['unblockDate']))
    else:
      producto.fechaBloqueo = None
      producto.fechaDesbloqueo = None
    producto.save()
    return JsonResponse({"msg": "Actualizado correctamente"})

def updateLugar(body):
  if 'block' in body.keys(): #single product
    lugar = Lugar.objects.get(pk=body['id'])
    lugar.fechaBloqueo = timezone.make_aware(datetime.fromisoformat(body['blockDate']))
    lugar.fechaDesbloqueo = timezone.make_aware(datetime.fromisoformat(body['unblockDate']))
    lugar.save()
    return JsonResponse({ "msg": "Actualizado correctamente" })
  else:
    lugar = Lugar.objects.get(pk=body['id'])
    lugar.piso = body['floor']
    lugar.capacidad = body['capacity']
    lugar.detalles = body['details']
    lugar.salon = body['room']
    if 'idProduct' in body.keys():
      idProducto = body['idProduct']
      lugar.idProductos.clear() # delete current many to many relation
      for el in idProducto: # add new relations
        producto = Producto.objects.get(pk=el)
        lugar.idProductos.add(producto) # creates aux table with relations
    if (body['blockDate'] != None) and (body['unblockDate'] != None): # not null
      lugar.fechaBloqueo = timezone.make_aware(datetime.fromisoformat(body['blockDate']))
      lugar.fechaDesbloqueo = timezone.make_aware(datetime.fromisoformat(body['unblockDate']))
    else:
      lugar.fechaBloqueo = None
      lugar.fechaDesbloqueo = None
    lugar.save()
    return JsonResponse({"msg": "Actualizado correctamente"})

@csrf_exempt
def deleteResource(req):
  if req.user.rol == None: return JsonResponse({"error": "Action not permited"})
  body_unicode = req.body.decode('utf-8')
  body = json.loads(body_unicode)
  if 'resourceType' in body.keys():
    tipoRecurso = body['resourceType']
    if tipoRecurso == "Lugar": return deleteLugar(body)
    elif tipoRecurso == "Producto": return deleteProducto(body)
    else: return JsonResponse({"error": "Resource type not valid"})
  else:
    return JsonResponse({"error": "Resource type not present"})

def deleteProducto(body):
  producto = Producto.objects.get(pk=body['id'])
  producto.deletedAt = timezone.now()
  producto.save()
  return JsonResponse({"error": "Resource type not present"})

def deleteLugar(body):
  lugar = Lugar.objects.get(pk=body['id'])
  lugar.deletedAt = timezone.now()
  lugar.save()
  return JsonResponse({"error": "Resource type not present"})

@csrf_exempt #Ya se borra el usuario
def deleteUser(req):
  usuario = Usuario.objects.get(id = req.POST["id"]) #Cambiar por la función de Carla para detectar qe usuario esta logueado
  #Asi se edita un usuario y se edita bien
  usuario.deletedAt = datetime.today()
  usuario.verified = 0
  usuario.correo = "Eliminado"
  usuario.password = "Eliminado"
  usuario.save()
  return JsonResponse({"user": usuario.id})

@csrf_exempt #Ya se regresan los datos del usuario para el llenado de los formularios
def getuseritself(req):
  usuario = Usuario.objects.get(id = req.POST["id"]) #Cambiarlo por metodo de Carla
  usuarios = {
    "nombre": usuario.nombre,
    "apellidoPaterno": usuario.apellidoPaterno,
    "apellidoMaterno": usuario.apellidoMaterno,
    "genero": usuario.genero,
    "estado":usuario.oficio,
    "correo":usuario.correo,
    "fechaNacimiento": usuario.fechaNacimiento,
  }
  return JsonResponse(usuarios)

# Estadistica
@csrf_exempt
def getGeneralStatistic(req):
  if req.user.rol == None: return JsonResponse({"error": "Action not permited"})
  body_unicode = req.body.decode('utf-8')
  body = json.loads(body_unicode)
  if 'graph' in body.keys():
    graphType = body['graph']
    if graphType == "Producto": return getMostReservedProducts(body)
    elif graphType == "Lugar": return getMostReservedPlaces(body)
    elif graphType == "Producto-categoria": return getMostReservedCategories(body)
  else: return JsonResponse({"error": "Graph type not valid"})

def getMostReservedProducts(body):
  timePeriod = body['timeRange']
  numberOfDaysToAdd = 7 if timePeriod == 'week' else 30 if timePeriod == 'month' else 365 if timePeriod == 'year' else 7
  datetimeRange = timezone.make_aware(datetime.today() - timedelta(days=numberOfDaysToAdd))
  mostReservedProducts = Producto.objects.filter(deletedAt=None, reserva__createdAt__range=(datetimeRange, timezone.make_aware(datetime.today()))).annotate(count=Count('id')).order_by('-count')[:5]
  productsResponse = []
  for product in mostReservedProducts:
    serializedPlace = serializers.serialize('json', [product])
    productsResponse.append({"place": serializedPlace, "count": product.count})
  return JsonResponse({"value": productsResponse})

def getMostReservedPlaces(body):
  timePeriod = body['timeRange']
  numberOfDaysToAdd = 7 if timePeriod == 'week' else 30 if timePeriod == 'month' else 365 if timePeriod == 'year' else 7
  datetimeRange = timezone.make_aware(datetime.today() - timedelta(days=numberOfDaysToAdd))
  mostReservedPlaces = Lugar.objects.filter(deletedAt=None, reserva__createdAt__range=(datetimeRange, timezone.make_aware(datetime.today()))).annotate(count=Count('id')).order_by('-count')[:5]
  placesResponse = []
  for place in mostReservedPlaces:
    serializedPlace = serializers.serialize('json', [place])
    placesResponse.append({"place": serializedPlace, "count": place.count})
  return JsonResponse({"value": placesResponse})

def getMostReservedCategories(body):
  timePeriod = body['timeRange']
  numberOfDaysToAdd = 7 if timePeriod == 'week' else 30 if timePeriod == 'month' else 365 if timePeriod == 'year' else 7
  datetimeRange = timezone.make_aware(datetime.today() - timedelta(days=numberOfDaysToAdd))
  productosEnReservas = Producto.objects.filter(deletedAt=None, reserva__createdAt__range=(datetimeRange, timezone.make_aware(datetime.today())))[:5]
  mostReservedCategories = productosEnReservas.values("categoria").annotate(num_category=Count('categoria'))
  productsResponse = []
  for category in mostReservedCategories:
    productsResponse.append({ "categoria": Producto.PRODUCT_CATEGORIES[category["categoria"]][1], "count": category['num_category']})
  return JsonResponse({"value": json.dumps(productsResponse)})

@csrf_exempt #Ya se regresan los datos del usuario para el llenado de los formularios
def createReserva(req):
  #Se le pasa el id del usuario con el metodo de Carla
  #Se le pasa el id del recurso o lugar desde el front, ¿como en la semana tec?
  idUsuario = Usuario.objects.get(id = 1)
  codigoReserva = random.randint(1, 1000000000000)
  fechaInicio = req.POST["FechaInicio"]
  fechaFinal = req.POST["fechaFinal"]
  status = req.POST["status"]
  comentarios = req.POST["comentarios"]
  horaI = req.POST["horaI"]
  horaF = req.POST["horaF"]
  Recurso = Reserva.objects.create(idUsuario = idUsuario, codigoReserva = codigoReserva, fechaInicio = fechaInicio, fechaFinal = fechaFinal, horaInicio = horaI, horaFinal = horaF, estatus = status, comentarios = comentarios)
  return JsonResponse({"Recurso": Recurso.id})

@csrf_exempt #Ya se regresan los datos del usuario para el llenado de los formularios
def updateReserva(req):
  #Mandar el id de la reserva desde el front?
  idReserva = Reserva.objects.get(id = 1)
  #Mandar el id del lugar y el del usuario y del producto desde el front como en la semana tec?
  estatus = req.POST["estatus"]
  Lugar = req.POST["Lugar"]
  Producto = req.POST["Producto"]
  idUsuario = Usuario.objects.get(id = req.POST["Idusuario"])
  idReserva.idUsuario = idUsuario
  idReserva.estatus = estatus
  idReserva.idLugar_id = Lugar
  idReserva.idProducto_id = Producto
  idReserva.save()
  return JsonResponse({"Recurso": idReserva.id})

@csrf_exempt #Ya se regresan los datos del usuario para el llenado de los formularios
def DeleteReserva(req):
  #Mandar el id de la reserva desde el front?
  idReserva = Reserva.objects.get(id = req.POST["id"])
  idReserva.estatus = 4
  idReserva.deletedAt = datetime.today()
  idReserva.save()
  return JsonResponse({"Recurso": idReserva.id})


# Authentication
@csrf_exempt
def loginUser(req):
  body_unicode = req.body.decode('utf-8')
  body = json.loads(body_unicode)
  email = body['email']
  password = body["password"]
  authenticatedUser = authenticate(req, correo=email, password=password)
  if authenticatedUser is not None:
    login(req, authenticatedUser) #set user in req.user
    return JsonResponse({"user": req.user.id})
  else:
    return JsonResponse({"error": "invalid credentials"})

@csrf_exempt
def createUser(req): # Add email validation
  try:
    email = req.POST["email"]
    password = req.POST["password"]
    name = req.POST["name"]
    lastName = req.POST["lastName"]
    secondLastName = req.POST["secondLastName"]
    gender = req.POST["gender"]
    dateOfBirth = req.POST["dateOfBirth"]
    work = req.POST["work"]
    username = name + ' ' + lastName + ' ' + secondLastName
    newUser = Usuario.objects.create_user(username=username, correo=email, password=password, genero=gender, fechaNacimiento=dateOfBirth, oficio=work, nombre=name, apellidoPaterno=lastName, apellidoMaterno=secondLastName, verified=False)
    # Create user and login at the same time
    authenticatedUser = authenticate(req, correo=email, password=password)
    login(req, authenticatedUser)
    return JsonResponse({"user": newUser.id})
  except:
    return JsonResponse({"Razon": "El campo no es unico"})

@csrf_exempt
def logoutUser(req):
  logout(req)
  return JsonResponse({"msg": "User logged out"})

@csrf_exempt
def getLoggedUser(req):
  return JsonResponse({"user": req.user.id})

@csrf_exempt
def sendEmail(req):
  body_unicode = req.body.decode('utf-8')
  body = json.loads(body_unicode)
  if 'type' in body.keys():
    typeEmail = body['type']
    if typeEmail == "verify-email": return sendVerificationEmail(body)
    elif typeEmail == "change-password": return sendChagePasswordEmail(body)
  else:
    return JsonResponse({"msg": "Tipo no valido"})

def sendVerificationEmail(body):
  user = Usuario.objects.get(correo=body["email"])
  codigo = generateCodigo()
  user.changePasswordCode = codigo
  user.save()
  subject = "Verifica tu correo"
  email = EmailMessage(
    subject,
    'Ingresa este codigo en la aplicación: ' + codigo,
    'inifniteseguridadapp@outlook.com',
    [body["email"]]
  )
  email.send()
  return JsonResponse({"msg": "Correo enviado"})

@csrf_exempt
def verifyUser(req):
  if user.changePasswordCode != -1:
    user = req.user
    user.verified = True
    user.save()
    return JsonResponse({"msg": "Usuario verificado exitosamente"})
  else:
    return JsonResponse({"error": "No se ha iniciado proceso de cambio de verificación de correo"})

def sendChagePasswordEmail(body):
  user = Usuario.objects.get(correo=body["email"])
  codigo = generateCodigo()
  user.changePasswordCode = codigo
  user.save()
  subject = "Cambia tu contraseña"
  email = EmailMessage(
    subject,
    'Ingresa este codigo en la aplicación: ' + codigo,
    'inifniteseguridadapp@outlook.com',
    [body["email"]]
  )
  email.send()
  return JsonResponse({"msg": "Correo enviado"})

@csrf_exempt
def verifyCode(req): # Called from front after sending code via email - email must be in body
  body_unicode = req.body.decode('utf-8')
  body = json.loads(body_unicode)
  email = body["email"]
  code = body["code"]
  user = Usuario.objects.get(correo=email)
  if user.changePasswordCode == code:
    user.changePasswordCode = -1 # Set to -1 to flag that the code has been used
    user.save()
    return JsonResponse({"msg": "Codigo correcto"})
  else:
    return JsonResponse({"error": "Código incorrecto"})

@csrf_exempt
def changePassword(req): # Called from front after sending code via email - email must be in body
  body_unicode = req.body.decode('utf-8')
  body = json.loads(body_unicode)
  email = body["email"]
  newPassword = body["password"]
  user = Usuario.objects.get(correo=email)
  if user.changePasswordCode != -1:
    user.set_password(newPassword)
    user.save()
    return JsonResponse({"msg": "Contraseña cambiada exitosamente"})
  else:
    return JsonResponse({"error": "No se ha iniciado proceso de cambio de contraseña"})

def generateCodigo():
  return ''.join(random.choice(string.ascii_letters) for x in range(8))


