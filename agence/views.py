from django.http import JsonResponse
from django.shortcuts import render

from .models import Agence, Voyage
from .models import Voyage
from django.core.exceptions import ValidationError

def add_voyage(request):
    if request.method == 'POST':
        destination = request.POST.get('title')
        image1 = request.FILES.get('image1')
        image2 = request.FILES.get('image2')
        image3 = request.FILES.get('image3')
        image4 = request.FILES.get('image4')
        description = request.POST.get('description', "Aucune description fournie.")
        date_depart = request.POST.get('date_depart') or None
        date_retour = request.POST.get('date_retour') or None
        nom_hotel = request.POST.get('nom_hotel', "Hôtel Inconnu")
        note_hotel = request.POST.get('note_hotel', 0)
        prix_adulte = request.POST.get('prix_adulte', 0)
        prix_enfant = request.POST.get('prix_enfant', 0)
        package = request.POST.get('package', "Standard")
        agence_id = request.POST.get('agence')
        activites = bool(request.POST.get('Activités'))
        transport = bool(request.POST.get('Transport'))
        billet_avion = bool(request.POST.get('billet_avion'))
        visa = bool(request.POST.get('visa'))

        try:
            agence = Agence.objects.get(id=agence_id)
            voyage = Voyage.objects.create(
                Destination=destination,
                image1=image1,
                image2=image2,
                image3=image3,
                image4=image4,
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
            return render(request, 'agence/add_voyage.html', {'success': True})
        except Agence.DoesNotExist:
            return render(request, 'agence/add_voyage.html', {'errors': 'Agence non trouvée.', 'title': destination})
        except ValidationError as e:
            return render(request, 'agence/add_voyage.html', {'errors': e, 'title': destination})

    agences = Agence.objects.all()
    return render(request, 'agence/add_voyage.html', {'agences': agences})


def display_voyage(request):
        destination='test'
        voyage= Voyage.objects.filter(destination=destination)
        if not voyage.exists():
            return JsonResponse({'success': False, 'error': {'field': 'title', 'message': 'Voyage not found'}})
        return render(request, 'agence/display_voyage.html', {'voyages': voyage})

