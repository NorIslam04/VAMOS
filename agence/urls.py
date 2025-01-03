from . import views
from django.urls import path

urlpatterns = [
    path('', views.add_voyage, name='add_voyage'),
    path('show_voyage', views.show_voyage, name='show_voyage'),
   
]