from uuid import uuid4
from django.db import models

class Note(models.Model):
    id = models.UUIDField(default=uuid4, primary_key=True, editable=False)
    local_id = models.UUIDField(null=False, default=uuid4)
    
    title = models.CharField(max_length=40)
    content = models.TextField()

    created_at = models.DateTimeField(help_text="date created on frontend")
    last_edited = models.DateTimeField(help_text="last edited on frontend")
    initial_sync = models.DateTimeField(auto_now_add=True, help_text="time of the first sync")
    last_sync = models.DateTimeField(auto_now=True, help_text="last time this was synced")

    favorite = models.BooleanField(default=False)
    trash = models.BooleanField(default=False)

    client = models.CharField(max_length=20, null=True)
    client_version = models.CharField(max_length=20, null=True)

    @staticmethod
    def create(
        local_id:str,
        title:str,
        content:str,
        created_at:str,
        last_edited:str,
        favorite:bool|None=None,
        trash:bool|None=None,
        client:str|None=None,
        client_version:str|None=None):
        new = Note(
            local_id=local_id,
            title=title,
            content=content,
            created_at=created_at,
            last_edited=last_edited,
            favorite=bool(favorite),
            trash=bool(trash),
            client=client,
            client_version=client_version,
        )
        new.save()
        return new

    @staticmethod
    def query(*q: models.Q) -> models.QuerySet:
        return Note.objects.filter(*q)
