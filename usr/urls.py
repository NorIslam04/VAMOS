from . import views
from django.urls import path

urlpatterns = [
    path('', views.signin, name='signin'),  # name='person' is the name of the url pattern, qui est utilisé pour les liens inverses et appelé la fcntion views.person
    path('login', views.login, name='login'),
    path('profil', views.profil, name='prof',),#name=
    path('reset', views.reset_id_user, name='reset'),
]