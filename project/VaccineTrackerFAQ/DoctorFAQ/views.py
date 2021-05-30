from django.shortcuts import render, redirect
from django.http import HttpResponse,JsonResponse

# Create your views here.

def FAQIndex(request):
	return render(request,'DoctorFAQ/faq.html', None)