from django.shortcuts import render
from django.http import HttpResponseRedirect,HttpResponse
from django.urls import reverse
from .models import User



# Create your views here.
# function with return render(request,response,context)

def profil(request):
    return render(request, 'user/profil.html')

def add_user(request):
    if request.method == 'POST':
        first_name = request.POST['first_name']
        last_name = request.POST['last_name']
        try:
            age = int(request.POST['age'])
        except ValueError:
            return HttpResponse("L'âge doit être un nombre entier valide.")

        
        user = User.objects.create(first_name=first_name, last_name=last_name, age=age)
        user.save()
        
        return HttpResponseRedirect(reverse('profil'))
    else:
        return render(request, 'user/login.html')
    
def show_users(request):
    print(User.objects.all())
    return render(request, 'user/show.html',{'users': User.objects.all()})
    
    