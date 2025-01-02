from django.db import models


class Agence(models.Model):
    id=models.AutoField(primary_key=True)
    nom=models.CharField(max_length=50)
    image=models.ImageField(upload_to='photos',default='photos/default.jpg')
   
    def __str__(self):
        return f"{self.nom}"