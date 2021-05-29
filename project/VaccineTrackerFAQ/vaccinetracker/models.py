from django.db import models


# Create your models here.

class Person(models.Model):
	name = models.CharField(max_length=50)
	phone = models.IntegerField()
	email = models.EmailField()
	pincode = models.IntegerField(max_length = 5)