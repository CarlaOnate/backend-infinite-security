from .models import Usuario, Producto, Reserva, Lugar
from django.utils import timezone
from datetime import datetime, timedelta

today = timezone.make_aware(datetime.today())

def updateDB():
  updateReservations()
  updateUsers()
  updateProductos()
  updateLugares()
  return "updated"

def updateReservations():
  reservations = Reserva.objects.exclude(estatus=3).exclude(estatus=4)
  for reserva in reservations:
    if (today >= reserva.startDate and today < reserva.endDate):
      reserva.estatus = 2
      print(today, '-', 'Reserva (', reserva.pk, ') change status to in-progress')
    if today > reserva.endDate:
      reserva.estatus = 3
      print(today, '-', 'Reserva (', reserva.pk, ') change status to finalized')
    reserva.save()

def updateUsers():
  users = Usuario.objects.exclude(fechaBloqueo=None)
  for user in users:
    userUnblockDate = user.fechaDesbloqueo
    if userUnblockDate < today:
      print(today, '-', 'Usuario (', producto.pk, ') remove block dates')
      user.fechaBloqueo = None
      user.fechaDesbloqueo = None
    user.save()

def updateProductos():
  productos = Producto.objects.exclude(fechaBloqueo=None)
  for producto in productos:
    productoUnblockDate = producto.fechaDesbloqueo
    if productoUnblockDate < today:
      print(today, '-', 'Producto (', producto.pk, ') remove block dates')
      producto.fechaBloqueo = None
      producto.fechaDesbloqueo = None
    producto.save()

def updateLugares():
  lugares = Lugar.objects.exclude(fechaBloqueo=None)
  for lugar in lugares:
    lugarUnblockDate = lugar.fechaDesbloqueo
    if lugarUnblockDate < today:
      print(today, '-', 'Lugar (', lugar.pk, ') remove block dates')
      lugar.fechaBloqueo = None
      lugar.fechaDesbloqueo = None
    lugar.save()