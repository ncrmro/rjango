from django.core.management.base import BaseCommand

from polls.factory import stage_polls


class Command(BaseCommand):
    """Create admin and fake users"""
    help = 'Create example polls'

    def handle(self, **options):
        stage_polls()

