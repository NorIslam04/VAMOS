from django.urls import path
from . import views

urlpatterns = [
    path('voyages/', views.vue_voyages, name='voyages'),
]