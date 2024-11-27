from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from .models import Usr


def login(request):
    return render(request, 'usr/login.html')

# Ajouter un utilisateur
def signin(request):
    if request.method == 'POST': 
        username = request.POST.get('username')  # Récupère les valeurs POST
        email = request.POST.get('email')
        password=request.POST.get('password')
        
        # Création de l'utilisateur
        user = Usr.objects.create(username=username, email=email, password=password)
        user.save()
        print("user a ete bien enregestrer")
        # Stocker l'ID de l'utilisateur dans la session
        #request.session['id_user'] = user.id #pour utiliser dans fonction profil et cette instruction generer un cookie cote client
        return HttpResponseRedirect(reverse('prof'))
    
    return render(request, 'usr/signin.html')

def profil(req):
    return render(req,'usr/prof.html')

