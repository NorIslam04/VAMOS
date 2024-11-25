from . import views
from django.urls import path

urlpatterns = [
    path('', views.profil, name='profil'),  # name='person' is the name of the url pattern, qui est utilisé pour les liens inverses et appelé la fcntion views.person
    path('login', views.add_user, name='login'),
    path('users', views.show_users, name='show_users'),
    path('reset-id-user/', views.reset_id_user, name='reset_id_user'),
]