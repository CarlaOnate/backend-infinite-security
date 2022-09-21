from site import USER_SITE
from types import BuiltinMethodType
from django.http import HttpResponse, JsonResponse, HttpResponseNotFound
from .models import Usuario, Producto, Reserva, Lugar
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt
from django.core import serializers
import datetime
import json

# Create your views here.
@csrf_exempt
def testingAPI(req):
  return JsonResponse({"msg": "API Running"})

# Historial reservas
  # Admin
@csrf_exempt
def getHistorial(req):
  fields = [ el.name for el in Reserva._meta.get_fields()]
  if req.POST:
    column = req.POST["column"]
    value = req.POST["value"]
    # Missing permission check
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
def getUserHistorial(req): # mis reservas -> del usuario loggeado
  # Missing permission check
  fields = [ el.name for el in Reserva._meta.get_fields() ]
  if req.POST:
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

@csrf_exempt
def getLoggedUser(req):
  return JsonResponse({"user": req.user.id})


#Edit user or admin
@csrf_exempt
def editUserAdmin(req):
  usuario = Usuario.objects.get(id = req.POST["id"])

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
