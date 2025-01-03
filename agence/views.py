import base64
from django.http import JsonResponse
from django.shortcuts import render
from django.core.files.base import ContentFile
from .models import Agence, Voyage
from .models import Voyage
from django.core.exceptions import ValidationError

# Django View
from django.http import JsonResponse
from django.core.files.base import ContentFile
from django.core.exceptions import ValidationError
import base64

def add_voyage(request):
    if request.method == 'POST':
        try:
            # Get basic form fields
            destination = request.POST.get('destination')
            description = request.POST.get('description', "Aucune description fournie.")
            date_depart = request.POST.get('date_depart') or None
            date_retour = request.POST.get('date_retour') or None
            nom_hotel = request.POST.get('nom_hotel')
            note_hotel = request.POST.get('note_hotel', 0)
            prix_adulte = request.POST.get('prix_adulte', 0)
            prix_enfant = request.POST.get('prix_enfant', 0)
            package = request.POST.get('package')
            agence_id = 1  # You might want to make this dynamic

            # Handle services
            services_selectionnes = request.POST.getlist('services')
            activites = 'activites' in services_selectionnes
            transport = 'transport' in services_selectionnes
            billet_avion = 'billet-avion' in services_selectionnes
            visa = 'visa' in services_selectionnes

            # Get the agency
            agence = Agence.objects.get(id=agence_id)

            # Handle image uploads
            images = []
            for i in range(1, 5):  # Handle up to 4 images
                image_key = f'image{i}'
                if image_key in request.FILES:
                    images.append(request.FILES[image_key])

            # Create the voyage object
            voyage = Voyage.objects.create(
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
                agence=agence,
                Activités=activites,
                Transport=transport,
                billet_avion=billet_avion,
                visa=visa
            )
            voyage.save()

            # Return JSON response for AJAX request
            return JsonResponse({
                'success': True,
                'redirect_url': '/success-url/'  # Replace with your success URL
            })

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


def display_voyage(request):
        destination='test'
        voyage= Voyage.objects.filter(destination=destination)
        if not voyage.exists():
            return JsonResponse({'success': False, 'error': {'field': 'title', 'message': 'Voyage not found'}})
        return render(request, 'agence/display_voyage.html', {'voyages': voyage})

