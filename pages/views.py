from django.shortcuts import render

def home(request):
    return render(request, 'pages/home.html')#path de template

def test(request):
    return render(request, 'pages/test.html')#path de template
