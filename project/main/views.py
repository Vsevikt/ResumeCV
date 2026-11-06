from django.shortcuts import render

# Create your views here.

def index(request):
    return render(request, 'main/index.html')

def resume(request):
    return render(request, "main/resume.html")