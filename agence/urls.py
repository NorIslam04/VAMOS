from . import views
from django.urls import path

urlpatterns = [
    path('add_voyage', views.add_voyage, name='add_voyage'),
   
]