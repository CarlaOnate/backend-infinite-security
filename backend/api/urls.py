from django.urls import path

from . import views

urlpatterns = [
  path('login-user', views.loginUser, name='loginUser'),

  path('create-user', views.createUser, name='createUser'),

  path('logged-user', views.getLoggedUser, name='getLoggedUser'),

  path('edit-user', views.editUserAdmin, name='editUserAdmin'),

  path('delete-user', views.deleteUser, name='deleteUser'),

  path('getuseritself-user', views.getuseritself, name='getuseritself'),

]