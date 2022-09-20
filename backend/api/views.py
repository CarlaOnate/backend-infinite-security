from django.http import HttpResponse, JsonResponse, HttpResponseNotFound
from .models import Usuario, Producto, Reserva, Lugar
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt
from django.core import serializers
import datetime

# Create your views here.
@csrf_exempt
def testingAPI(req):
  return JsonResponse({"msg": "API Running"})

@csrf_exempt
def createReserva(req):
  usuario = Usuario.objects.get(pk=12)
  lugar = Lugar.objects.create(piso=1, salon=12, detalles="padritsimo", capacidad=10, createdAt=datetime.datetime.now())
  producto = Producto.objects.create(nombre="cisco",	detalles="cisco", modelo=1, noSerie=2, categoria=2, cantidadTotal=50, cantidadSolicitada=2, tipo=1, createdAt=datetime.datetime.now())
  Reserva.objects.create(codigoReserva="JAS782", idUsuario=usuario, fechaInicio=datetime.datetime.now(), fechaFinal=datetime.datetime.now(), estatus=1, idLugar=lugar,	idProducto=producto)
  return JsonResponse({"msg": "API Running"})

# Historial reservas
@csrf_exempt
def getHistorial(req):
  column = req.POST["column"]
  value = req.POST["value"]
  # Missing permission check
  columnText = column + '__contains'
  reservas = Reserva.objects.filter(**{columnText:value})
  serializedReservas = serializers.serialize('json', reservas)
  return JsonResponse(serializedReservas, safe=False)

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