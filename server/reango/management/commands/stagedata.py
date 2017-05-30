from django.conf import settings
from django.core import management
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    """Run each apps stage data commands"""

    help = 'Create staging data'

    def handle(self, **options):
        if settings.DEBUG:
            management.call_command("stageusers")
            management.call_command("stagepolls")

