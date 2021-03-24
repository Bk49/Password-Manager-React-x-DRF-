from django.db import models

# Create your models here.

class Password(models.Model):
    name = models.CharField(max_length=255, null=False, blank=False)
    passwordTxt = models.TextField(max_length=255, null=False, blank=False)
    timestamp = models.DateTimeField()

    def __str__(self):
        return self.title