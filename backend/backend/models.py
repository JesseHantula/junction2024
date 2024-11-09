from django.db import models

class User(models.Model):
    username = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=255)
    birthday = models.DateField()
    gender = models.CharField(max_length=50)
    race = models.CharField(max_length=50)
    values = models.JSONField(default=list)
    working_style = models.CharField(max_length=50, null=True, blank=True)

    def __str__(self):
        return self.username

class Company(models.Model):
    name = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=255)
    values = models.JSONField(default=list)
    preferences = models.JSONField(default=list)
    working_habits = models.JSONField(default=list)

    def __str__(self):
        return self.name