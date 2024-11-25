from django.shortcuts import render, redirect
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse
from .models import User
from django.shortcuts import redirect

# Ajouter un utilisateur
def add_user(request):
    if request.method == 'POST': 
        first_name = request.POST.get('first_name')  # Récupère les valeurs POST
        last_name = request.POST.get('last_name')
        try:
            age = int(request.POST.get('age'))
        except ValueError:
            return HttpResponse("L'âge doit être un nombre entier valide.")
        
        # Création de l'utilisateur
        user = User.objects.create(first_name=first_name, last_name=last_name, age=age)
        user.save()
        
        # Stocker l'ID de l'utilisateur dans la session
        request.session['id_user'] = user.id #pour utiliser dans fonction profil et cette instruction generer un cookie cote client
        return HttpResponseRedirect(reverse('profil'))
    
    return render(request, 'user/sign_in.html')

# Afficher tous les utilisateurs
def show_users(request):
    users = User.objects.all()  # Récupérer tous les utilisateurs
    return render(request, 'user/show.html', {'users': users})

# Page profil
def profil(request):
    # Récupérer l'ID de l'utilisateur à partir de la session
    id_user = request.session.get('id_user', 0)
    
    if id_user == 0:
        return HttpResponse("Vous devez vous connecter pour accéder à cette page.")
    
    try:
        user = User.objects.get(id=id_user)  # Récupérer l'utilisateur par son ID
    except User.DoesNotExist:
        return HttpResponse("Utilisateur introuvable.")
    
    return render(request, 'user/profil.html', {'user': user})

def reset_id_user(request): # Réinitialiser l'ID de l'utilisateur, modifier les cookies
    if request.method == 'POST':
        request.session['id_user'] = 0  # Réinitialise id_user cote serveur(cookie)
        return redirect('login')  # Redirige vers la page de connexion
    return HttpResponse("Méthode non autorisée", status=405)

def login(request):
        if request.method == 'POST':
            first_name = request.POST.get('first_name') #cette instruction contient la valeur 'first_name' qui recupere la valeur de l'input et cherche dans la base de donnée et returne la valeur
            last_name = request.POST.get('last_name')

            try:
                user = User.objects.get(first_name=first_name, last_name=last_name)
                request.session['id_user'] = user.id # affecter la valeur de l'id_user si on a besion de l'utiliser dans une autre fonction
                return HttpResponseRedirect(reverse('profil'))
            except User.DoesNotExist:
                return HttpResponse("Utilisateur introuvable.")
        
        return render(request, 'user/login.html')#path de template

