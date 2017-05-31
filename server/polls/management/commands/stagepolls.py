import datetime
import pytz
from django.core.management.base import BaseCommand
from polls.models import Question, Choice


def create_polls():
    question1 = Question.objects.create(
            question_text='Do androids dream of electric sheep?',
            pub_date=datetime.datetime.now(tz=pytz.UTC)
    )
    Choice.objects.create(question=question1, votes=10, choice_text='yes' )
    Choice.objects.create(question=question1, votes=7, choice_text='no')

    Question.objects.create(
            question_text='Will we colonize mars?',
            pub_date=datetime.datetime.now(tz=pytz.UTC)
    )


class Command(BaseCommand):
    """Create admin and fake users"""
    help = 'Create example polls'

    def handle(self, **options):
        create_polls()
