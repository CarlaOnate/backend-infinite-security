from pdb import lasti2lineno
from .models import Usuario, Producto, Usuario, Lugar
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt

# Create your views here.
@csrf_exempt
def testingAPI(req):
  return "testing"

@csrf_exempt
def loggedUser(req):
  return req.user

@csrf_exempt
def loginUser(req):
  email = req.POST["email"]
  password = req.POST["password"]
  print('\n\n', email, password, '\n\n')
  authenticatedUser = authenticate(req, correo=email, password=password)
  if authenticatedUser is not None:
    user = Usuario.objects.get(correo=authenticatedUser)
    print('Autheticated user', user)
    login(req, user) #set user in req.user
    return user.id
  else:
    return "Invalid credentials"



@csrf_exempt
def createUser(req): #Addd email validation
  email = req.POST["email"]
  password = req.POST["password"]
  name = req.POST["name"]
  lastName = req.POST["lastName"]
  secondLastName = req.POST["secondLastName"]
  gender = req.POST["gender"]
  dateOfBirth = req.POST["dateOfBirth"]
  gender = req.POST["gender"]
  work = req.POST["work"]
  username = name + ' ' + lastName + ' ' + secondLastName
  user = Usuario.objects.create_user(username=username, correo=email, password=password, genero=gender, fechaNacimiento=dateOfBirth, oficio=work, nombre=name, appellidoPaterno=lastName, appellidoMaterno=secondLastName)
  user.save()
  # Create user and login at the same time
  # login(req, user)
  print('User created =>', user)
  return user.id