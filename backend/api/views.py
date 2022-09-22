from django.http import HttpResponse, JsonResponse, HttpResponseNotFound
from .models import Usuario, Producto, Usuario, Lugar
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt
from datetime import date
import json

# Create your views here.
@csrf_exempt
def testingAPI(req):
  return JsonResponse({"msg": "API Running"})

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

