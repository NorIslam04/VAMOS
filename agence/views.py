from django.shortcuts import render
from django.urls import reverse
from .models import Voyage

from django.shortcuts import render, redirect
from .models import Voyage
from django.core.exceptions import ValidationError

def add_voyage(request):
    if request.method == 'POST':
        title = request.POST.get('title')
        image1 = request.FILES.get('image1')  # Utilisez request.FILES pour les fichiers téléchargés
        image2 = request.FILES.get('image2')
        image3 = request.FILES.get('image3')
        image4 = request.FILES.get('image4')

        # Création de l'objet Voyage
        try:
            voyage = Voyage.objects.create(
                titre=title,
                image1=image1,
                image2=image2,
                image3=image3,
                image4=image4
            )
            voyage.save()
            return render(request, 'agence/add_voyage.html', {'success': True})
        except ValidationError as e:
            return render(request, 'agence/add_voyage.html', {'errors':e ,'title': title})

    return render(request, 'agence/add_voyage.html')

