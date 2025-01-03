from django.db import models

class Usr(models.Model):
    username=models.CharField(max_length=50)
    email=models.EmailField(max_length=50)
    password=models.CharField(max_length=50)
    phoneNumber=models.CharField(max_length=50,default="0000000000")
    image=models.ImageField(upload_to='photos',default='photos/default.jpg')

    def __str__(self):
        return f"{self.username}"


