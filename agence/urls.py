from . import views
from django.urls import path

urlpatterns = [
    path('', views.add_voyage, name='add_voyage'),
    path('display_voyage', views.display_voyage, name='display_voyage'),
   
]