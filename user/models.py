from django.db import models

class User(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    age = models.IntegerField()

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class Photo(models.Model):
    user = models.ForeignKey(User, related_name='photos', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='photos/%Y/%m/%d', blank=True, null=True)  # Supprimer le default

    def __str__(self):
        return f"Photo de {self.user.first_name} {self.user.last_name}"
    


    