from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import redirect, render
from django.urls import reverse
from .models import Usr


def login(request):
    if request.method == 'POST':
            username = request.POST.get('username') #cette instruction contient la valeur 'first_name' qui recupere la valeur de l'input et cherche dans la base de donnée et returne la valeur
            password = request.POST.get('password')

            try:
                print("im here")
                user = Usr.objects.get(username=username, password=password)
                print("user",user)
                request.session['id_user'] = user.id # affecter la valeur de l'id_user si on a besion de l'utiliser dans une autre fonction dans le cookie du client
                return HttpResponseRedirect(reverse('prof')) #rediriger vers la page de profil
            except Usr.DoesNotExist:
                return HttpResponse("Utilisateur introuvable.")
        
    return render(request, 'usr/login.html')#path de template

# Ajouter un utilisateur
def signin(request):
    if request.method == 'POST': 
        username = request.POST.get('username')  # Récupère les valeurs POST
        email = request.POST.get('email')
        password=request.POST.get('password')
        
        # Création de l'utilisateur
        user = Usr.objects.create(username=username, email=email, password=password)
        user.save()
        # Stocker l'ID de l'utilisateur dans la session
        request.session['id_user'] = user.id #pour utiliser dans fonction profil et cette instruction generer un cookie cote client
        return HttpResponseRedirect(reverse('prof'))
    
    return render(request, 'usr/signin.html')

def profil(req):
    # Récupérer l'ID de l'utilisateur à partir de la session
    id_user = req.session.get('id_user', 0) #stocker dans le cookie cote client et recuperer cote serveur
    
    if id_user == 0:
        return HttpResponse("Vous devez vous connecter pour accéder à cette page.")
    
    try:
        user = Usr.objects.get(id=id_user)  # Récupérer l'utilisateur par son ID
    except Usr.DoesNotExist:
        return HttpResponse("Utilisateur introuvable.")
    
    return render(req, 'usr/prof.html', {'user': user})

def reset_id_user(request): # Réinitialiser l'ID de l'utilisateur, modifier les cookies
    if request.method == 'POST':
        request.session['id_user'] = 0  # Réinitialise id_user cote serveur(cookie)
        return redirect('login')  # Redirige vers la page de connexion
    return HttpResponse("Méthode non autorisée", status=405)

