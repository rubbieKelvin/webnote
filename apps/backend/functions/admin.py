from django.contrib import admin

# Register your models here.
from .models.items import Note

admin.site.register(Note)