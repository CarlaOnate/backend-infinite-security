from site import USER_SITE
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
def logoutUser(req):
  logout(req)
  return JsonResponse({"msg": "User logged out"})

@csrf_exempt
def getLoggedUser(req):
  return JsonResponse({"user": req.user.id})

