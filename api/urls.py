from django.urls import path

from . import views

urlpatterns = [
  #Auth routes
  path('login-user', views.loginUser, name='loginUser'),
  path('create-user', views.createUser, name='createUser'),
  path('logged-user', views.getLoggedUser, name='getLoggedUser'),
  path('logout-user', views.logoutUser, name='logoutUser'),
  path('historial/', views.getHistorial, name='getHistorial'),
  path('user/historial/', views.getUserHistorial, name='getUserHistorial'),
  path('users', views.getUsers, name='getUsers'),
  path('edit-user', views.editUserAdmin, name='editUserAdmin'),
  path('delete-user', views.deleteUser, name='deleteUser'),
  path('getuseritself-user', views.getuseritself, name='getuseritself'),
  path('create-resource', views.createRecurso, name='createRecurso'),
  #Manda los recursos
  path('get-resource', views.getRecurso, name='getRecurso'),
  path('update-resource', views.updateRecurso, name='updateRecurso'),
  path('delete-resource', views.deleteResource, name='deleteResource'),
  path('estadistica-general', views.getGeneralStatistic, name='getGeneralStatistic'),
  path('estadistica-user', views.getUserStatistic, name='getUserStatistic'),
    path('get-resourceCel', views.getRecursoC, name='getRecursoC'),
  # Reservas
  path('get-reserva', views.getReserva, name='getReserva'),
  path('create-reserva', views.createReserva, name='createReserva'),
  path('update-reserva', views.updateReserva, name='updateReserva'),
  path('delete-reserva', views.DeleteReserva, name='DeleteReserva'),
  path('logout-user', views.logoutUser, name='logoutUser'),
  # Email auth
  path('email', views.sendEmail, name='sendEmail'),
  # Change password
  path('verify-user', views.verifyUser, name='verifyUser'),
  path('verify-code', views.verifyCode, name='verifyCode'),
  path('change-password', views.changePassword, name='changePassword'),
]