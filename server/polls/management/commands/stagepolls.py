import datetime
import pytz
from django.core.management.base import BaseCommand
from polls.models import Question


def create_polls():
    Question.objects.create(
            question_text='Do androids dream of electric sheep?',
            pub_date=datetime.datetime.now(tz=pytz.UTC)
    )
    Question.objects.create(
            question_text='Will we colonize mars?',
            pub_date=datetime.datetime.now(tz=pytz.UTC)
    )


class Command(BaseCommand):
    """Create admin and fake users"""
    help = 'Create example polls'

    def handle(self, **options):
        create_polls()
