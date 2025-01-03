import base64
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.core.files.base import ContentFile
from django.urls import reverse
from .models import Agence, Voyage
from .models import Voyage
from django.core.exceptions import ValidationError

# Django View
from django.http import JsonResponse
from django.core.files.base import ContentFile
from django.core.exceptions import ValidationError
import base64

def add_voyage(request):
    id_agence = request.session.get('id_agence', 0)
    if id_agence == 0:
        return HttpResponse("Vous devez vous connecter pour accéder à cette page.")
    
    if request.method == 'POST':
        try:
            # Récupérer les champs du formulaire
            destination = request.POST.get('destination')
            description = request.POST.get('description', "Aucune description fournie.")
            date_depart = request.POST.get('date_depart') or None
            date_retour = request.POST.get('date_retour') or None
            nom_hotel = request.POST.get('nom_hotel')
            note_hotel = request.POST.get('note_hotel', 0)
            prix_adulte = request.POST.get('prix_adulte', 0)
            prix_enfant = request.POST.get('prix_enfant', 0)
            package = request.POST.get('package')

            # Gérer les services
            services_selectionnes = request.POST.getlist('services')
            activites = 'activites' in services_selectionnes
            transport = 'transport' in services_selectionnes
            billet_avion = 'billet-avion' in services_selectionnes
            visa = 'visa' in services_selectionnes

            # Gérer les images téléchargées
            images = []
            for i in range(1, 5):  # Gérer jusqu'à 4 images
                image_key = f'image{i}'
                if image_key in request.FILES:
                    images.append(request.FILES[image_key])

            # Récupérer l'agence à partir de l'ID
            agence = Agence.objects.get(id=id_agence)

            # Créer l'objet voyage
            voyage = Voyage.objects.create(
                agence=agence,  # Assigner l'agence à la clé étrangère
                Destination=destination,
                image1=images[0] if len(images) > 0 else None,
                image2=images[1] if len(images) > 1 else None,
                image3=images[2] if len(images) > 2 else None,
                image4=images[3] if len(images) > 3 else None,
                description=description,
                date_depart=date_depart,
                date_retour=date_retour,
                nom_hotel=nom_hotel,
                note_hotel=note_hotel,
                prix_adulte=prix_adulte,
                prix_enfant=prix_enfant,
                package=package,
                Activités=activites,
                Transport=transport,
                billet_avion=billet_avion,
                visa=visa
            )
            voyage.save()

            return JsonResponse(
                {'success': True,
                'redirect_url': reverse('show_voyage')}
                )

        except Agence.DoesNotExist:
            return JsonResponse({
                'success': False,
                'error': 'Agence non trouvée.'
            })
        except ValidationError as e:
            return JsonResponse({
                'success': False,
                'error': str(e)
            })
        except Exception as e:
            return JsonResponse({
                'success': False,
                'error': str(e)
            })

    # GET request - render the form
    agences = Agence.objects.all()
    return render(request, 'agence/add_voyage.html', {'agences': agences})




def login_agence(request, username, password):
    try:
        # Vérifier si l'agence existe dans la base de données
        agence = Agence.objects.get(nom=username)
        
        # Vérification du mot de passe
        if password == agence.password:
            request.session['id_agence'] = agence.id  # Sauvegarder l'ID de l'agence dans la session
            return JsonResponse({
                'success': True, 
                'redirect_url': reverse('add_voyage')
            })
        else:
            return JsonResponse({
                'success': False,
                'error': 'Incorrect password'
            })

    except Agence.DoesNotExist:
        # Agence non trouvée
        return JsonResponse({'success': False, 'error': 'Agence not found'})
    
def show_voyage(request):
    id_agence = request.session.get('id_agence', 0)
    if id_agence == 0:
        return HttpResponse("Vous devez vous connecter pour accéder à cette page.")
    agence=Agence.objects.get(id=id_agence)
    voyages = Voyage.objects.filter(agence=agence)
    return render(request, 'agence/show_voyage.html', {'voyages': voyages})