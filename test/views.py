from django.shortcuts import render
import json

def vue_voyages(request):
    # Vos données de voyage
    donnees_voyage = [
        {
            "image": "imageVamos/nice.jpg",
            "city": "Nice",
            "countryIcon": "imageVamos/france.png",
            "date": "5 - 10 Mai",
            "transportIcon": "imageVamos/bus.png",
            "location": "La Promenade des Anglais",
            "resortImage": "imageVamos/resort.png",
            "rating": 5,
            "title": "Arrispectif"
        },
        # ... autres données
    ]
    
    # Conversion des données en JSON pour JavaScript
    donnees_json = json.dumps(donnees_voyage)
    
    return render(request, 'votre_template.html', {
        'donnees_voyage': donnees_json
    })