from django.urls import path
from .views.item import URLS

urlpatterns = [
    path(f'{name}/', func) for name, func in URLS
]
