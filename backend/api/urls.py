from django.urls import path
from . import views

urlpatterns = [
  #Auth routes
  path('login-user', views.loginUser, name='loginUser'),
  path('create-user', views.createUser, name='createUser'),
  path('logged-user', views.getLoggedUser, name='getLoggedUser'),
  path('email', views.sendEmail, name='sendEmail'),
  path('logout-user', views.logoutUser, name='logoutUser'),
]