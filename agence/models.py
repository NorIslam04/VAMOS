from django.db import models


class Agence(models.Model):
    id=models.AutoField(primary_key=True)
    nom=models.CharField(max_length=50)
    image=models.ImageField(upload_to='photos',default='photos/default.jpg')
   
    def __str__(self):
        return f"{self.nom}"
    
class Voyage(models.Model):
    id=models.AutoField(primary_key=True)
    titre=models.CharField(max_length=50)
    image1=models.ImageField(upload_to='photos/voyage',default='photos/default.jpg')
    image2=models.ImageField(upload_to='photos/voyage',default='photos/default.jpg')
    image3=models.ImageField(upload_to='photos/voyage',default='photos/default.jpg')
    image4=models.ImageField(upload_to='photos/voyage',default='photos/default.jpg')
    
    def __str__(self):
        return f"{self.titre}"