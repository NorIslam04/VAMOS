from . import views
from django.urls import path

urlpatterns = [
    path('', views.home, name='home'), 
    path("test",views.test) # name='person' is the name of the url pattern, qui est utilisé pour les liens inverses et appelé la fcntion views.person
]