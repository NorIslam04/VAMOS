from django.shortcuts import render

def home(request):
    return render(request, 'pages/home.html')#path de template

def test(request):
    return render(request, 'pages/test.html')#path de template

def after_search(request):
    return render(request, 'pages/after_search.html')#path de template

def homePage(request):
    return render(request, 'pages/homePage.html')#path de template
