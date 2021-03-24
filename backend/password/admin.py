from django.contrib import admin
from .models import Password

class PasswordAdmin(admin.ModelAdmin):
    list_display = ('name', 'passwordTxt', 'timestamp')

# Register your models here.

admin.site.register(Password, PasswordAdmin)