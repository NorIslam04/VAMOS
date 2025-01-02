from django.shortcuts import render

def add_voyage(request):
    return render(request, 'agence/add_voyage.html')#path de template
