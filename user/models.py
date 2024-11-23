from django.db import models

class User(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    age = models.IntegerField()
    photo=models.ImageField(upload_to='photos/%Y/%m/%d',default='photos/default.jpg')

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

    