from django.urls import path
from . import views

urlpatterns = [
  path('login-user', views.loginUser, name='loginUser'),
  path('create-user', views.createUser, name='createUser'),
  path('logged-user', views.getLoggedUser, name='getLoggedUser'),
  path('logout-user', views.logoutUser, name='logoutUser'),
  path('historial/', views.getHistorial, name='getHistorial'),
  path('user/historial/', views.getUserHistorial, name='getUserHistorial'),
]