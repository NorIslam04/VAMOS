from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import redirect, render
from django.urls import reverse
from .models import Usr
from django.contrib.auth.hashers import check_password


# Ajouter un utilisateur
def signin(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('password')

        # Vérifications supplémentaires
        if Usr.objects.filter(username=username).exists():
            return JsonResponse({'success': False, 'error': {'field': 'username', 'message': 'Username already exists'}})

        if Usr.objects.filter(email=email).exists():
            return JsonResponse({'success': False, 'error': {'field': 'email', 'message': 'Email already registered'}})

        # Création de l'utilisateur
        user = Usr.objects.create(
            username=username,
            email=email,
            password=password  # Hachage du mot de passe
        )
        user.save()

        # Stocker l'ID utilisateur dans la session
        request.session['id_user'] = user.id

        return JsonResponse({'success': True, 'redirect_url': reverse('homePage')})

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



def login(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')

        try:
            user = Usr.objects.get(username=username)# Récupérer l'utilisateur par son nom d'utilisateur (username) dans la base de données
            
            # Vérification du mot de passe
            if password == user.password:
                request.session['id_user'] = user.id
                
                return JsonResponse({
                    'success': True, 
                    'redirect_url': reverse('homePage')
                })
            else:
                return JsonResponse({
                    'success': False, 
                    'error': 'Incorrect password'
                })

        except Usr.DoesNotExist:
            # Utilisateur non trouvé
            return JsonResponse({
                'success': False, 
                'error': 'User not found'
            })

    return render(request, 'usr/login.html')

def test(request):
    chaps = [
        {'name': 'Chapter 1', 'content': 'This is the first chapter'},
        {'name': 'Chapter 2', 'content': 'This is the second chapter'},
        {'name': 'Chapter 3', 'content': 'This is the third chapter'}
    ]
    return render(request, 'usr/test.html',{'chaps':chaps}) #context
