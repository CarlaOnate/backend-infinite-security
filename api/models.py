from email.policy import default
from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class Producto(models.Model):
  PRODUCT_CATEGORIES = [
    (1, 'Routers'),
    (2, 'Switches'),
    (3, 'Computadoras'),
    (4, 'Cisco Software'),
    (5, 'Software de Cálculo'),
    (6, 'Cableado'),
    (7, 'Antivirus'),
  ]
  PRODUCT_TYPES = [
    (1, 'SOFTWARE'),
    (2, 'HARDWARE'),
  ]
  id = models.BigAutoField(primary_key=True)
  nombre = models.TextField()
  detalles = models.TextField(blank=True)
  modelo = models.TextField()
  noSerie = models.IntegerField()
  categoria = models.IntegerField(choices=PRODUCT_CATEGORIES)
  cantidadTotal = models.IntegerField()
  cantidadSolicitada = models.IntegerField(blank=True, null=True)
  tipo = models.IntegerField(choices=PRODUCT_TYPES)
  fechaBloqueo = models.DateTimeField(blank=True, null=True)
  fechaDesbloqueo = models.DateTimeField(blank=True, null=True)
  createdAt = models.DateTimeField(auto_now_add=True) #It automatically adds the date of the moment the instance is created
  updatedAt = models.DateTimeField(auto_now=True) #Automatically updates timestamp when instance is saved
  deletedAt = models.DateTimeField(null=True, blank=True)

  class Meta:
    db_table = 'Productos'


class Lugar(models.Model):
  PISOS_ENUM = [
    (1, 'Piso 1'),
    (2, 'Piso 2'),
    (3, 'Piso 3')
  ]
  id = models.BigAutoField(primary_key=True)
  piso = models.TextField()
  capacidad = models.IntegerField()
  idProductos = models.ManyToManyField(Producto, blank=True) # ForeignKey -> sqlite no tiene arrayFields - en caso de que se borre se tendran que hacer los cambios manualmente
  detalles = models.TextField(blank=True)
  salon = models.TextField()
  fechaBloqueo = models.DateTimeField(blank=True, null=True)
  fechaDesbloqueo = models.DateTimeField(blank=True, null=True)
  createdAt = models.DateTimeField(auto_now_add=True) # It automatically adds the date of the moment the instance is created
  updatedAt = models.DateTimeField(auto_now=True) # Automatically updates timestamp when instance is saved
  deletedAt = models.DateTimeField(null=True, blank=True)

  class Meta:
    db_table = 'Lugar'

class Usuario(AbstractUser):
  GENERO_ENUM = [
    (1, 'Masculino'),
    (2, 'Femenino'),
    (3, 'Otro'),
  ]
  OFICIO_ENUM = [
    (1, 'Profesor'),
    (2, 'Estudiante'),
    (3, 'Investigador'),
    (4, 'Otro'),
  ]
  ROL_ENUM = [
    (1, 'Admin general'),
    (2, 'Admin parcial'),
  ]
  id = models.BigAutoField(primary_key=True)
  username = models.TextField() # Nombre completo creado de los 3 campos
  password = models.TextField()
  nombre = models.TextField()
  apellidoPaterno = models.TextField()
  apellidoMaterno = models.TextField()
  genero = models.IntegerField(choices=GENERO_ENUM, null=True)
  fechaNacimiento = models.DateField(null=True)
  oficio = models.IntegerField(choices=OFICIO_ENUM, null=True)
  correo = models.EmailField(unique=True)
  verified = models.BooleanField(default=False)
  changePasswordCode = models.TextField(null=True, blank=True)
  rol = models.IntegerField(choices=ROL_ENUM, null=True, blank=True)
  fechaBloqueo = models.DateTimeField(blank=True, null=True)
  fechaDesbloqueo = models.DateTimeField(blank=True, null=True)
  fechaCambioContrasena = models.DateTimeField(blank=True, null=True)
  createdAt = models.DateTimeField(auto_now_add=True) # It automatically adds the date of the moment the instance is created
  updatedAt = models.DateTimeField(auto_now=True) # Automatically updates timestamp when instance is saved

  #Se añade el departamento al que el usuario es asignado
  departament = models.TextField(blank = True, null=True)

  deletedAt = models.DateTimeField(null=True, blank=True)
  USERNAME_FIELD = 'correo'
  REQUIRED_FIELDS = ['nombre', 'apellidoPaterno', 'apellidoMaterno', 'username', 'genero', 'oficio', 'rol']
  pass

  class Meta:
    db_table = 'Usuario'

class Reserva(models.Model):
  ESTATUS_ENUM = [
    (1, 'Por iniciar'),
    (2, 'En proceso'),
    (3, 'Finalizado'),
    (4, 'Cancelado'),
  ]
  id = models.BigAutoField(primary_key=True)
  codigoReserva = models.TextField(unique=True)
  idUsuario = models.ForeignKey("Usuario", on_delete=models.RESTRICT)
  idProducto = models.ForeignKey('Producto',  on_delete=models.RESTRICT, null=True, blank=True)
  cantidadProducto = models.IntegerField(null=True, blank=True,)
  idLugar = models.ForeignKey("Lugar" ,on_delete=models.RESTRICT, null=True, blank=True)
  fechaInicio = models.DateField() #Se cambian estos dos para que solo se registre fecha y no hora con fecha
  fechaFinal = models.DateField()
  startDate = models.DateTimeField(null=True, blank=True)
  endDate = models.DateTimeField(null=True, blank=True)
  #Para saber las horas de uso
  horaInicio = models.TextField(null = True)
  horaFinal = models.TextField(null = True)
  estatus = models.IntegerField(choices=ESTATUS_ENUM, default = 1)
  comentarios = models.TextField(null=True, blank=True)
  createdAt = models.DateTimeField(auto_now_add=True) # It automatically adds the date of the moment the instance is created
  updatedAt = models.DateTimeField(auto_now=True) # Automatically updates timestamp when instance is saved
  deletedAt = models.DateTimeField(null=True, blank=True)

  class Meta:
    db_table = 'Reserva'