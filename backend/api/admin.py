from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Usuario, Reserva, Producto, Lugar

# Register your models here.

admin.site.register(Usuario, UserAdmin)
admin.site.register(Reserva)
admin.site.register(Producto)
admin.site.register(Lugar)