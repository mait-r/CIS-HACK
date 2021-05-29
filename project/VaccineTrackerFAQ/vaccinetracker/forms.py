from django import forms
from .models import Person

class PersonForm(forms.ModelForm):
	class Meta:
		model = Person
		fields = '__all__'	

	name = forms.CharField(widget=forms.TextInput(attrs={'placeholder': 'Your Name', 'class': 'form-control'}))
	pincode = forms.IntegerField(widget=forms.TextInput(attrs={'placeholder': '1100**', 'class': 'form-control'}))
	phone = forms.IntegerField(widget=forms.TextInput(attrs={'placeholder': 'Phone', 'class': 'form-control'}))
	email = forms.EmailField(widget=forms.EmailInput(attrs={'placeholder': 'hello@example.com', 'class': 'form-control'}))