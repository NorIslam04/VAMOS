from django.shortcuts import render

def signin(request):
    return render(request, 'usr/signin.html')
def login(request):
    return render(request, 'usr/login.html')
