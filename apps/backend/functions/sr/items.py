from functions.models import Note
from rest_framework.serializers import ModelSerializer
from django_restql.mixins import DynamicFieldsMixin

class NoteSr(ModelSerializer, DynamicFieldsMixin):
    class Meta:
        model = Note
        fields = "__all__"
