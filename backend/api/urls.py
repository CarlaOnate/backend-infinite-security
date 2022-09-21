from django.urls import path
from . import views

urlpatterns = [
  path('login-user', views.loginUser, name='loginUser'),
  path('create-user', views.createUser, name='createUser'),
  path('logged-user', views.getLoggedUser, name='getLoggedUser'),
  path('historial/', views.getHistorial, name='getHistorial'),
  path('user/historial/', views.getUserHistorial, name='getUserHistorial'),
  path('edit-user', views.editUserAdmin, name='editUserAdmin'),
  path('create-resource', views.createRecurso, name='createRecurso'),
  path('get-resource', views.getRecurso, name='getRecurso'),
]