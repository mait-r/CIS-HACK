from django.db import models
from django.contrib.auth.models import User


class Question(models.Model):
	question = models.TextField(help_text = "Enter your Question here...")
	datetime = models.DateTimeField()

class Answer(models.Model):
	doctor = models.ForeignKey(User, on_delete=models.CASCADE)
	question = models.ForeignKey(Question,on_delete = models.PROTECT)
	answer = models.TextField(help_text = "Enter the Answer here...")