from django.db import models


class Agence(models.Model):
    id=models.AutoField(primary_key=True)
    nom=models.CharField(max_length=50)
    image=models.ImageField(upload_to='photos',default='photos/default.jpg')
   
    def __str__(self):
        return f"{self.nom}"
    
class Voyage(models.Model):
    id = models.AutoField(primary_key=True)
    Destination = models.CharField(max_length=50, default="Destination Inconnue")
    image1 = models.ImageField(upload_to='photos/voyage', default='photos/default.jpg')
    image2 = models.ImageField(upload_to='photos/voyage', default='photos/default.jpg')
    image3 = models.ImageField(upload_to='photos/voyage', default='photos/default.jpg')
    image4 = models.ImageField(upload_to='photos/voyage', default='photos/default.jpg')
    description = models.TextField(default="Aucune description fournie.")
    date_depart = models.DateField(null=True, blank=True)  # Si la date n'est pas obligatoire
    date_retour = models.DateField(null=True, blank=True)
    nom_hotel = models.CharField(max_length=50, default="Hôtel Inconnu")
    note_hotel = models.IntegerField(default=0)
    prix_adulte = models.IntegerField(default=0)
    prix_enfant = models.IntegerField(default=0)
    package = models.CharField(max_length=50, default="Standard")
    agence = models.ForeignKey(Agence, on_delete=models.CASCADE, default=1)
    Activités = models.BooleanField(default=False)
    Transport = models.BooleanField(default=False)
    billet_avion = models.BooleanField(default=False)
    visa = models.BooleanField(default=False)
    
    def __str__(self):
        return f"{self.Destination}"
