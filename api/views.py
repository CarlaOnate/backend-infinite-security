from concurrent.futures.process import _ExceptionWithTraceback
from django.http import JsonResponse, HttpResponseServerError, HttpResponseForbidden, HttpResponseBadRequest
from django.shortcuts import HttpResponse
from .models import Usuario, Producto, Reserva, Lugar
from django.db.models import Count
from django.contrib.auth.decorators import login_required
from django.core.mail import EmailMessage
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt
from django.core import serializers
from datetime import datetime, timedelta, date
from django.db.models import Q
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
def getHistorial(req):
  if req.user.rol == None: return JsonResponse({"error": "Action not permited"})
  try:
    if bool(req.body):
      body_unicode = req.body.decode('utf-8')
      body = json.loads(body_unicode)
      if 'column' in body.keys() and 'value' in body.keys():
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
      "estatusName": Reserva.ESTATUS_ENUM[reserva.estatus - 1][1],
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
        "rol": Usuario.ROL_ENUM[reserva.idUsuario.rol-1][1],
        "id": reserva.idUsuario.pk
      }
    reservaJson.append({"reserva": reservaDict, "usuario": userDict, "producto": productoDict, "lugar": lugarDict})
  return reservaJson

# User
@csrf_exempt
@login_required
def getUserHistorial(req): # reservas de 1 usuario o del usuario loggeado
  if req.body:
    # if req.user.rol == None: return JsonResponse({"error": "Action not permited"})
    body_unicode = req.body.decode('utf-8')
    body = json.loads(body_unicode)
    userId = body['id']
    user = Usuario.objects.get(pk=userId)
    reservas = Reserva.objects.filter(idUsuario=user).order_by("fechaInicio")
    serializedReservas = reservaJSONResponse(reservas)
    return JsonResponse({"values": serializedReservas}, safe=False)
  elif req.user:
    reservas = Reserva.objects.filter(idUsuario=req.user).order_by("fechaInicio")
    serializedReservas = reservaJSONResponse(reservas)
    return JsonResponse({"values": serializedReservas}, safe=False)
  else:
    return JsonResponse({"msg": "User not logged in"})

# Get all users
@csrf_exempt
def getUsers(req):
  if req.user.rol == None: return JsonResponse({"error": "Action not permited"})
  allUsers = Usuario.objects.filter(deletedAt=None).all()
  usersResponse = []
  for user in allUsers:
    serializedUser = getUserJson(user)
    usersResponse.append(serializedUser)
  return JsonResponse({ "values": usersResponse })

def getUserJson(user):
  rolName = 'Usuario'
  if user.rol != None: rolName = Usuario.ROL_ENUM[user.rol - 1][1]
  usuarioDict = {
    "pk": user.id,
    "username": user.username,
    "nombre": user.nombre,
    "apellidoPaterno": user.apellidoPaterno,
    "apellidoMaterno": user.apellidoMaterno,
    "genero": user.genero,
    "departament": user.departament,
    "oficio": Usuario.OFICIO_ENUM[user.oficio - 1][1],
    "correo": user.correo,
    "verified": user.verified,
    "fechaDesbloqueo": user.fechaDesbloqueo,
    "rol": user.rol,
    "rolName": rolName,
    "estatus": calculateUserStatus(user)
  }
  return usuarioDict


#Edit user or admin
@csrf_exempt
def editUserAdmin(req):
  #if req.user.rol == None: return JsonResponse({"error": "Action not permited"})
  body_unicode = req.body.decode('utf-8')
  body = json.loads(body_unicode)
  usuario = Usuario.objects.get(id = body['id'])
  #En el req debe de venir nombre, rol, departamento, apellidos maternos y paternos

  #Asi se edita un usuario y se edita bien
  nombre = body['name']
  apellido = body["lastName"]
  apellido2 = body["secondLastName"]
  departamento = body["departament"]
  correo = body["email"]

  if 'rol' in body.keys():
    rol = body["rol"]

  if 'dateOfBirth' in body.keys():
    usuario.fechaNacimiento = body['dateOfBirth']
  
  if 'gender' in body.keys():
    usuario.genero = body['gender']
  
  if 'work' in body.keys():
    usuario.oficio = body['work']

  if 'unblockDate' in body.keys() and 'blockDate' in body.keys():
    usuario.fechaBloqueo = body['blockDate']
    usuario.fechaDesbloqueo = body['unblockDate']

  if 'activate' in body.keys():
    usuario.fechaBloqueo = None
    usuario.fechaDesbloqueo = None

  usuario.nombre = nombre
  usuario.correo = correo
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

@csrf_exempt
def getRecursoC(req): # Individual or all resources
  #if req.user.rol == None: return JsonResponse({"error": "Action not permited"})
  body_unicode = req.body.decode('utf-8')
  body = json.loads(body_unicode)
  if 'resourceType' in body.keys():
    tipoRecurso = body['resourceType']
    if tipoRecurso == "Lugar": return getLugarSinPiso(body)
    elif tipoRecurso == "Producto": return getProductoC(body)
    else: return JsonResponse({"error": "Resource type not valid"})
  else:
    return JsonResponse({"error": "Resource type not present"})

def getLugarSinPiso(body):
  if 'id' in body.keys(): #single product
    lugar = Lugar.objects.get(pk=body['id'])
    serializedLugar = serializers.serialize('json', [lugar])
    return JsonResponse({"value": serializedLugar})
  elif 'byFloor' in body.keys():
    lugaresList = []
    lugares = Lugar.objects.all().filter(deletedAt=None) # return lugares that havent been deleted
    for lugar in lugares:
      lugaresList.append(getElementResponse(lugar, 'Lugar'))
    return JsonResponse({"value": lugaresList}, safe=False)
  else:
    lugares = Lugar.objects.all().filter(deletedAt=None)
    lugaresList = []
    for lugar in lugares:
      lugaresList.append(getElementResponse(lugar, 'Lugar'))
    return JsonResponse({"value": lugaresList}, safe=False)

@csrf_exempt
def getProductoC(body):
  if 'id' in body.keys(): #single product
    producto = Producto.objects.get(pk=body['id'])
    serializedProducto = serializers.serialize('json', [producto])
    return JsonResponse({"value": serializedProducto})
  elif 'byCategory' in body.keys():
    returnObj = {}
    for category in Producto.PRODUCT_CATEGORIES_CEL:
      productos = Producto.objects.all().filter(deletedAt=None, categoria=category[0]) # return Productes that havent been deleted
      productsList = []
      for producto in productos:
        productDict = {
          "id": producto.pk,
          "nombre": producto.nombre,
          "categoria": Producto.PRODUCT_CATEGORIES_CEL[producto.categoria - 1][1],
        }
        productsList.append(productDict)
      returnObj[category[1]] = productsList
    return JsonResponse({"value": returnObj})
  elif 'byType' in body.keys():
    returnObj = {}
    for type in Producto.PRODUCT_TYPES:
      productos = Producto.objects.all().filter(deletedAt=None, tipo=type[0])
      productsList = []
      for producto in productos:
        productDict = {
          "id": producto.pk,
          "nombre": producto.nombre,
          "categoria": Producto.PRODUCT_CATEGORIES_CEL[producto.categoria - 1][1],
        }
        productsList.append(productDict)
      returnObj[type[1]] = productsList
    return JsonResponse({"value": returnObj})
  else:
    productos = Producto.objects.all().filter(deletedAt=None) # return products that havent been deleted
    serializedProductos = serializers.serialize('json', productos)
    return JsonResponse({"value": serializedProductos})

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
  #if req.user.rol == None: return JsonResponse({"error": "Action not permited"})
  body_unicode = req.body.decode('utf-8')
  body = json.loads(body_unicode)
  if 'resourceType' in body.keys():
    tipoRecurso = body['resourceType']
    if tipoRecurso == "Lugar": return getLugar(body)
    elif tipoRecurso == "Producto": return getProducto(body)
    else: return JsonResponse({"error": "Resource type not valid"})
  else:
    return JsonResponse({"error": "Resource type not present"})

@csrf_exempt
def getProducto(body):
  if 'id' in body.keys(): #single product
    producto = Producto.objects.get(pk=body['id'])
    serializedProducto = serializers.serialize('json', [producto])
    return JsonResponse({"value": serializedProducto})
  elif 'byCategory' in body.keys():
    returnObj = {}
    for category in Producto.PRODUCT_CATEGORIES:
      productos = Producto.objects.all().filter(deletedAt=None, categoria=category[0]) # return Productes that havent been deleted
      productsList = []
      for producto in productos:
        productDict = {
          "id": producto.pk,
          "nombre": producto.nombre,
          "categoria": Producto.PRODUCT_CATEGORIES[producto.categoria - 1][1],
        }
        productsList.append(productDict)
      returnObj[category[1]] = productsList
    return JsonResponse({"value": returnObj})
  elif 'byType' in body.keys():
    returnObj = {}
    for type in Producto.PRODUCT_TYPES:
      productos = Producto.objects.all().filter(deletedAt=None, tipo=type[0])
      productsList = []
      for producto in productos:
        productDict = {
          "id": producto.pk,
          "nombre": producto.nombre,
          "categoria": Producto.PRODUCT_CATEGORIES[producto.categoria - 1][1],
        }
        productsList.append(productDict)
      returnObj[type[1]] = productsList
    return JsonResponse({"value": returnObj})
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
      lugaresList = []
      for lugar in lugares:
        lugaresList.append(getElementResponse(lugar, 'Lugar'))
        returnObj[piso[0]] = lugaresList
    return JsonResponse({"value": returnObj})
  else:
    lugares = Lugar.objects.all().filter(deletedAt=None)
    lugaresList = []
    for lugar in lugares:
      lugaresList.append(getElementResponse(lugar, 'Lugar'))
    return JsonResponse({"value": lugaresList}, safe=False)


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
  #if req.user.rol == None: return JsonResponse({"error": "Action not permited"})
  body_unicode = req.body.decode('utf-8')
  body = json.loads(body_unicode)

  usuario = Usuario.objects.get(id = body["id"])
  usuario.deletedAt = timezone.make_aware(datetime.today())
  usuario.verified = 0
  usuario.save()

  return JsonResponse({"user": usuario.id})

@csrf_exempt
def getuseritself(req): # Regresa cualquier user, por id o el loggeado
  body_unicode = req.body.decode('utf-8')
  body = json.loads(body_unicode)
  searchById = False
  if 'value' in body.keys():
    try:
      valueId = int(body['value'])
      if valueId: searchById = True
    except:
      searchById = False
    if searchById: usuario = Usuario.objects.filter(pk=body['value'])[:1]
    else: usuario = Usuario.objects.filter(username__contains=body['value'])[:1]
    if usuario.exists():
      usuario = usuario[0]
      rolName = 'Usuario'
      if usuario.rol != None: rolName = Usuario.ROL_ENUM[usuario.rol - 1][1]
      usuarioDict = {
        "pk": usuario.id,
        "username": usuario.username,
        "nombre": usuario.nombre,
        "apellidoPaterno": usuario.apellidoPaterno,
        "apellidoMaterno": usuario.apellidoMaterno,
        "genero": usuario.genero,
        "departament": usuario.departament,
        "oficio": Usuario.OFICIO_ENUM[usuario.oficio-1][1],
        "oficioNumber": usuario.oficio,
        "correo": usuario.correo,
        "fechaNacimiento": usuario.fechaNacimiento,
        "fechaDesbloqueo": usuario.fechaDesbloqueo,
        "rol": usuario.rol,
        "verified": usuario.verified,
        "rolName": rolName,
        "estatus": calculateUserStatus(usuario)
      }
      return JsonResponse(usuarioDict)
    else:
      return JsonResponse({"warning": "No se encontro ese usuario"})
  else:
    return JsonResponse({"error": "Argumentos invalidos"})

def calculateUserStatus(user):
  userStatus = "Activo"
  if user.fechaDesbloqueo and timezone.make_aware(datetime.today()) < user.fechaDesbloqueo : userStatus = "Bloqueado"
  if user.deletedAt != None: userStatus = "Eliminado"
  return userStatus

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
    else: return HttpResponseBadRequest
  else: return JsonResponse({"error": "Graph type not valid"})

def getMostReservedProducts(body):
  timePeriod = body['timeRange']
  numberOfDaysToAdd = 7 if timePeriod == 'week' else 30 if timePeriod == 'month' else 365 if timePeriod == 'year' else 7
  datetimeRange = timezone.make_aware(datetime.today() - timedelta(days=numberOfDaysToAdd))
  mostReservedProducts = Producto.objects.filter(deletedAt=None, reserva__createdAt__range=(datetimeRange, timezone.make_aware(datetime.today()))).annotate(count=Count('id')).order_by('-count')[:5]
  productsResponse = []
  for product in mostReservedProducts:
    serializedPlace = getElementResponse(product, 'Producto')
    productsResponse.append({"recurso": serializedPlace, "count": product.count})
  return JsonResponse({"value": productsResponse})

def getMostReservedPlaces(body):
  timePeriod = body['timeRange']
  numberOfDaysToAdd = 7 if timePeriod == 'week' else 30 if timePeriod == 'month' else 365 if timePeriod == 'year' else 7
  datetimeRange = timezone.make_aware(datetime.today() - timedelta(days=numberOfDaysToAdd))
  mostReservedPlaces = Lugar.objects.filter(deletedAt=None, reserva__createdAt__range=(datetimeRange, timezone.make_aware(datetime.today()))).annotate(count=Count('id')).order_by('-count')[:5]
  placesResponse = []
  for place in mostReservedPlaces:
    serializedPlace = getElementResponse(place, 'Lugar')
    placesResponse.append({"recurso": serializedPlace, "count": place.count})
  return JsonResponse({"value": placesResponse})

def getMostReservedCategories(body):
  timePeriod = body['timeRange']
  numberOfDaysToAdd = 7 if timePeriod == 'week' else 30 if timePeriod == 'month' else 365 if timePeriod == 'year' else 7
  datetimeRange = timezone.make_aware(datetime.today() - timedelta(days=numberOfDaysToAdd))
  productosEnReservas = Producto.objects.filter(deletedAt=None, reserva__createdAt__range=(datetimeRange, timezone.make_aware(datetime.today())))[:5]
  mostReservedCategories = productosEnReservas.values("categoria").annotate(num_category=Count('categoria'))
  productsResponse = []
  for category in mostReservedCategories:
    productsResponse.append({ "recurso": Producto.PRODUCT_CATEGORIES[category["categoria"] - 1][1], "count": category['num_category']})
  return JsonResponse({"value": productsResponse})

# Estadisticas de 1 solo user
@csrf_exempt
def getUserStatistic(req):
  body_unicode = req.body.decode('utf-8')
  body = json.loads(body_unicode)
  if 'graph' in body.keys():
    graphType = body['graph']

    if 'id' in body.keys(): userId = body['id']
    else: userId = req.user.id

    if graphType == "Producto": return getUserMostReservedProducts(body, userId)
    elif graphType == "Lugar": return getUserMostReservedPlace(body, userId)
    elif graphType == "Producto-categoria": return getUserMostReservedCategories(body, userId)
  else: return JsonResponse({"error": "Graph type not valid"})

def getUserMostReservedProducts(body, user):
  timePeriod = body['timeRange']
  numberOfDaysToAdd = 7 if timePeriod == 'week' else 30 if timePeriod == 'month' else 365 if timePeriod == 'year' else 7
  datetimeRange = timezone.make_aware(datetime.today() - timedelta(days=numberOfDaysToAdd))
  mostReservedProducts = Producto.objects.filter(deletedAt=None, reserva__idUsuario=user, reserva__createdAt__range=(datetimeRange, timezone.make_aware(datetime.today()))).annotate(count=Count('id')).order_by('-count')[:5]
  productsResponse = []
  for product in mostReservedProducts:
    serializedPlace = getElementResponse(product, 'Producto')
    productsResponse.append({"recurso": serializedPlace, "count": product.count})
  return JsonResponse({ "value": productsResponse, "graphCols": ["Producto",  "Cantidad"] })

def getUserMostReservedPlace(body, user):
  timePeriod = body['timeRange']
  numberOfDaysToAdd = 7 if timePeriod == 'week' else 30 if timePeriod == 'month' else 365 if timePeriod == 'year' else 7
  datetimeRange = timezone.make_aware(datetime.today() - timedelta(days=numberOfDaysToAdd))
  mostReservedPlaces = Lugar.objects.filter(deletedAt=None, reserva__idUsuario=user, reserva__createdAt__range=(datetimeRange, timezone.make_aware(datetime.today()))).annotate(count=Count('id')).order_by('-count')[:5]
  placesResponse = []
  for place in mostReservedPlaces:
    serializedPlace = getElementResponse(place, 'Lugar')
    placesResponse.append({"recurso": serializedPlace, "count": place.count})
  return JsonResponse({ "value": placesResponse, "graphCols": ["Lugar",  "Cantidad"] })

def getUserMostReservedCategories(body, user):
  timePeriod = body['timeRange']
  numberOfDaysToAdd = 7 if timePeriod == 'week' else 30 if timePeriod == 'month' else 365 if timePeriod == 'year' else 7
  datetimeRange = timezone.make_aware(datetime.today() - timedelta(days=numberOfDaysToAdd))
  productosEnReservas = Producto.objects.filter(deletedAt=None, reserva__idUsuario=user, reserva__createdAt__range=(datetimeRange, timezone.make_aware(datetime.today())))[:5]
  mostReservedCategories = productosEnReservas.values("categoria").annotate(num_category=Count('categoria'))
  productsResponse = []
  for category in mostReservedCategories:
    productsResponse.append({ "recurso": Producto.PRODUCT_CATEGORIES[category["categoria"] - 1][1], "count": category['num_category']})
  return JsonResponse({"value": productsResponse, "graphCols": ["Categoria",  "Cantidad"] })

def getElementResponse(element, tipo):
  elementDict = None

  if tipo == 'Producto':
    elementDict = {
      "id": element.pk,
      "nombre": element.nombre,
      "modelo": element.modelo,
      "detalles": element.detalles,
      "categoria": element.PRODUCT_CATEGORIES[element.categoria - 1][1],
      "cantidadSolicitada": element.cantidadSolicitada
    }

  if tipo == 'Lugar':
    elementDict = {
      "id": element.pk,
      "piso": element.piso,
      "salon": element.salon,
      "detalles": element.detalles,
      "capacidad": element.capacidad,
    }
  return elementDict

@csrf_exempt
def getReserva(req):
  body_unicode = req.body.decode('utf-8')
  body = json.loads(body_unicode)
  if 'value' in body.keys():
    try:
      valueId = int(body['value'])
      if valueId: searchById = True
    except:
      searchById = False
    if searchById: reserva = Reserva.objects.filter(pk=body['value'])[:1]
    else: reserva = Reserva.objects.filter(codigoReserva__contains=body['value'])[:1]
    if reserva.exists():
      reserva = reserva[0]
      reservaJson = reservaJSONResponse([reserva])[0]
      return JsonResponse(reservaJson)
    else:
      return JsonResponse({"warning": "No se encontro esa reserva"})
  return JsonResponse({"Recurso": "Recurso.id"})

@csrf_exempt
def createReserva(req):
  body_unicode = req.body.decode('utf-8')
  body = json.loads(body_unicode)
  idUsuario = Usuario.objects.get(pk=req.user.id)
  #try:
  codigoReserva = generateCodigoReserva()
  fechaInicio = body["FechaInicio"]
  fechaFinal = body["fechaFinal"]
  horaI = body["horaI"]
  horaF = body["horaF"]
  idLugar = body["Salon"]
  idProducto = body["Productos"]
  startDate = timezone.make_aware(datetime.strptime(fechaInicio+horaI, '%Y-%m-%d%H:%M'))
  endDate = timezone.make_aware(datetime.strptime(fechaFinal+horaF, '%Y-%m-%d%H:%M'))
  if checkSpotAvailable(startDate, endDate, idLugar):
    Recurso = Reserva.objects.create(idUsuario = idUsuario, codigoReserva = codigoReserva, startDate=startDate, endDate=endDate, fechaInicio = fechaInicio, fechaFinal = fechaFinal, horaInicio = horaI, horaFinal = horaF, comentarios = None, idLugar_id = idLugar, idProducto_id = idProducto, estatus = 1)
    return JsonResponse({"Recurso": Recurso.id})
  else:
    return JsonResponse({"warning": "Ese lugar no esta disponible"})
  #except:
  #  return HttpResponseServerError()

def checkSpotAvailable(startDate, endDate, idLugar):
  if idLugar != None:
    overlapping_slots = Reserva.objects.filter(idLugar_id=idLugar, endDate__gte=startDate, startDate__lte=endDate)
    if overlapping_slots.exists(): return False
    else: return True

@csrf_exempt
def updateReserva(req):
  body_unicode = req.body.decode('utf-8')
  body = json.loads(body_unicode)
  idReserva = Reserva.objects.filter(pk=body['reserva'])[:1]
  if idReserva.exists():
    idReserva = idReserva[0]
    try:
      lugar = Lugar.objects.get(pk=int(body['lugar'])) if body['lugar'] != None else None
      producto = Producto.objects.get(pk=int(body['producto'])) if body['producto'] != None else None
      estatus = body['estatus'] if body['estatus'] != None else 1
      idUsuario = Usuario.objects.get(pk=body['usuario'])
      idReserva.idUsuario = idUsuario
      idReserva.estatus = estatus
      idReserva.idLugar = lugar
      idReserva.idProducto = producto
      idReserva.save()
      return JsonResponse({ "recurso": idReserva.id })
    except:
      return JsonResponse({ "warning": "Algun id proporcionado no es valido" })
  else: return JsonResponse({ "warning": "Algun id proporcionado no es valido" })

@csrf_exempt #Ya se regresan los datos del usuario para el llenado de los formularios
def DeleteReserva(req):
  body_unicode = req.body.decode('utf-8')
  body = json.loads(body_unicode)
  try:
    idReserva = Reserva.objects.get(pk=body["id"])
    idReserva.estatus = 4
    idReserva.save()
    return JsonResponse({"recurso": idReserva.id})
  except:
    return HttpResponseServerError

# Authentication
@csrf_exempt
def loginUser(req):
  body_unicode = req.body.decode('utf-8')
  body = json.loads(body_unicode)
  try:
    user = Usuario.objects.get(correo=body['email'])
    if user.deletedAt != None: return HttpResponseForbidden()
    if user.fechaDesbloqueo != None:
      today = timezone.make_aware(datetime.today())
      print(today, user.fechaBloqueo, user.fechaDesbloqueo)
      if today >= user.fechaBloqueo and today < user.fecha.Desbloqueo: return HttpResponseForbidden()
    email = body['email']
    password = body["password"]
    authenticatedUser = authenticate(req, correo=email, password=password)
    if authenticatedUser is not None:
      login(req, authenticatedUser) # set user in req.user
      userDict = {
        "user": req.user.id,
        "rol": req.user.rol
      }
      return JsonResponse(userDict)
    else:
      return JsonResponse({ "error": "El correo o la contraseña no son correctos" })
  except:
      return JsonResponse({ "error": "El correo o la contraseña no son correctos" })

@csrf_exempt
def createUser(req): # Add email validation
  try:
    body_unicode = req.body.decode('utf-8')
    body = json.loads(body_unicode)
    email = body["email"]
    password = body["password"]
    name = body["name"]
    lastName = body["lastName"]
    secondLastName = body["secondLastName"]
    gender = body["gender"]
    dateOfBirth = body["dateOfBirth"]
    work = body["work"]
    username = name + ' ' + lastName + ' ' + secondLastName
    newUser = Usuario.objects.create_user(username=username, correo=email, password=password, genero=gender, fechaNacimiento=dateOfBirth, oficio=work, nombre=name, apellidoPaterno=lastName, apellidoMaterno=secondLastName, verified=False)
    return JsonResponse({"user": newUser.id, "rol": newUser.rol})
  except:
   return HttpResponseBadRequest()

@csrf_exempt
def logoutUser(req):
  logout(req)
  return JsonResponse({"msg": "User logged out"})

@csrf_exempt
def getLoggedUser(req):
  if not req.user.is_authenticated: return HttpResponseForbidden()
  return JsonResponse({ "user": req.user.id, "rol": req.user.rol })

@csrf_exempt
def sendEmail(req):
  body_unicode = req.body.decode('utf-8')
  body = json.loads(body_unicode)
  if 'type' in body.keys():
    typeEmail = body['type']
    try:
      if typeEmail == "verify-email": return sendVerificationEmail(body)
      elif typeEmail == "change-password": return sendChagePasswordEmail(body)
    except: return HttpResponseBadRequest()
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
    [body["email"]],
  )
  email.send()
  return JsonResponse({"msg": "Correo enviado"})

@csrf_exempt
def verifyUser(req):
  if req.user.changePasswordCode != -1:
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
    user.verified = True
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
    user.fechaCambioContraseña = timezone.make_aware(datetime.today())
    user.save()
    return JsonResponse({"msg": "Contraseña cambiada exitosamente"})
  else:
    return JsonResponse({"error": "No se ha iniciado proceso de cambio de contraseña"})

def generateCodigo():
  return ''.join(random.choice(string.ascii_letters) for x in range(8))

def generateCodigoReserva():
  return ''.join(random.choice(string.ascii_letters) for x in range(15)).capitalize()



