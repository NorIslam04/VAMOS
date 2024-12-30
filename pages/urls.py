from . import views
from django.urls import path

urlpatterns = [
    path('', views.home, name='home'), # name='person' is the name of the url pattern, qui est utilisé pour les liens inverses et appelé la fcntion views.person
    path("test",views.test,name='test'),
    path("a",views.after_search,name='after_search'),
    path("homePage",views.homePage,name='homePage'),
]