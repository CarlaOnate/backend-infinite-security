from .models import Usuario, Producto, Reserva, Lugar
from django.utils import timezone
from datetime import datetime, timedelta

def updateDB():
  updateReservations()
  updateUsers()
  updateProductos()
  updateLugares()
  return "updated"

def updateReservations():
  reservations = Reserva.objects.all()
  today = timezone.make_aware(datetime.today())
  for reserva in reservations:
    # Updatear cantidad de productos que se prestaron, restarlos de cantidad Solicitada
    reservationDate = datetime(reserva.fechaInicio + ' ' + reserva.horaInicio)
    if reservationDate < today: reserva.estatus = 2
    if reservationDate < today:
      reserva.estatus = 3
      #currentQty = reserva.cantidadProducto
      #modifiedQty = reserva.idProducto.cantidadSolicitada - currentQty
      #reserva.idProducto.cantidadSolicitada = modifiedQty
    reserva.save()

def updateUsers():
  users = Usuario.objects.exclude(fechaBloqueo=None)
  for user in users:
    userUnblockDate = user.fechaDesbloqueo
    if userUnblockDate < today:
      user.fechaBloqueo = None
      user.fechaDesbloqueo = None
    user.save()

def updateProductos():
  productos = Producto.objects.exclude(fechaBloqueo=None)
  for producto in productos:
    productoUnblockDate = producto.fechaDesbloqueo
    if productoUnblockDate < today:
      producto.fechaBloqueo = None
      producto.fechaDesbloqueo = None
    producto.save()

def updateLugares():
  lugares = Lugar.objects.exclude(fechaBloqueo=None)
  for lugar in lugares:
    lugarUnblockDate = lugar.fechaDesbloqueo
    if lugarUnblockDate < today:
      lugar.fechaBloqueo = None
      lugar.fechaDesbloqueo = None
    lugar.save()