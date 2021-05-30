from django.shortcuts import render, redirect
from django.http import HttpResponse,JsonResponse
import requests
import json
import datetime

from .models import Person
from .forms import PersonForm

# Create your views here.

def RegisterPerson(request):
	if(request.method == 'GET'):
		form = PersonForm()
		data = {}
		data['form'] = form
		return render(request,'vaccinetracker/RegisterPerson.html',data)
	else:
		person = PersonForm(request.POST)
		person.save()
		pincode = request.POST.get('pincode')
		return redirect('/getvaccine/' + str(pincode))

def FetchVaccine(request,pincode):
	pincode = int(pincode)
	today = datetime.datetime.today().strftime("%d-%m-%Y")
	tomorrow = (datetime.datetime.today() + datetime.timedelta(days=1)).strftime("%d-%m-%Y")
	url = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode={}&date={}".format(pincode,tomorrow)
	header = {'content-type': 'application/json'}
	response = requests.get(url, headers = header)
	data = response.json()
	return JsonResponse(data)


def GetVaccine(request,pincode):
	pincode = int(pincode)
	today = datetime.datetime.today().strftime("%d-%m-%Y")
	tomorrow = (datetime.datetime.today() + datetime.timedelta(days=1)).strftime("%d-%m-%Y")
	url = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode={}&date={}".format(pincode,tomorrow)
	header = {'content-type': 'application/json'}
	response = requests.get(url, headers = header)
	data = response.json()
	return render(request,'vaccinetracker/GetVaccine.html', data)