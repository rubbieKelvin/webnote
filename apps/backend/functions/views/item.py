from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.decorators import api_view
from functions.models import Note
from functions.sr.items import NoteSr

@api_view(["post"])
def getNotes(request: Request) -> Response:
    notes = Note.query()
    return Response(
        NoteSr(notes, many=True)
        .data
    )


URLS = [
    ('getNotes', getNotes)
]