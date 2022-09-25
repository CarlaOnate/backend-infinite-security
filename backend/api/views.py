from site import USER_SITE
from types import BuiltinMethodType
from django.http import HttpResponse, JsonResponse, HttpResponseNotFound
from .models import Usuario, Producto, Reserva, Lugar
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt
from datetime import date
import json
from django.core import serializers
from datetime import datetime
from django.utils import timezone
import json

# Create your views here.
@csrf_exempt
def testingAPI(req):
  return JsonResponse({"msg": "API Running"})

# Historial reservas
  # Admin
@csrf_exempt
@login_required
def getHistorial(req): # historial reservas -> solo para admins
  fields = [ el.name for el in Reserva._meta.get_fields()]
  if req.user.rol == None: return JsonResponse({"error": "Action not permited"})
  if req.POST:
    column = req.POST["column"]
    value = req.POST["value"]
    columnText = column + '__contains'
    reservas = Reserva.objects.filter(**{columnText:value}).order_by("fechaInicio")
    serializedReservas = serializers.serialize('json', reservas)
    return JsonResponse({"values": serializedReservas, "columns": fields}, safe=False)
  else:
    reservas = Reserva.objects.all().order_by("fechaInicio")
    serializedReservas = serializers.serialize('json', reservas)
    return JsonResponse({"values": serializedReservas, "columns": fields}, safe=False)

# User
@csrf_exempt
@login_required
def getUserHistorial(req): # reservas de 1 usuario o del usuario loggeado
  fields = [ el.name for el in Reserva._meta.get_fields() ]
  if req.POST:
    if req.user.rol == None: return JsonResponse({"error": "Action not permited"})
    userId = req.POST["usuario"]
    user = Usuario.objects.get(pk=userId)
    reservas = Reserva.objects.filter(idUsuario=user).order_by("fechaInicio")
    serializedReservas = serializers.serialize('json', reservas)
    return JsonResponse({"values": serializedReservas, "columns": fields}, safe=False)
  elif req.user:
    reservas = Reserva.objects.filter(idUsuario=req.user).order_by("fechaInicio")
    serializedReservas = serializers.serialize('json', reservas)
    return JsonResponse({"values": serializedReservas, "columns": fields}, safe=False)
  else:
    return JsonResponse({"msg": "User not logged in"})

# Authentication
@csrf_exempt
def loginUser(req):
  email = req.POST["email"]
  password = req.POST["password"]
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
  usuario.deletedAt = date.today()
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

@csrf_exempt
def getGeneralStatistics(req):
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
  return JsonResponse("HOLO")