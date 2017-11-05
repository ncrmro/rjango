from django.conf import settings
from django.core import management
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    """Run each apps stage data commands"""

    help = 'Create staging data'

    def add_arguments(self, parser):
        parser.add_argument('--user_count', type=int, default=25)
        parser.add_argument(
                '--noinput',
                action='store_true',
                default=False,
        )

    def handle(self, **options):
        if settings.DEBUG or options['staging']:
            if options['noinput']:
                management.call_command("flush", '--noinput')
            else:
                management.call_command("flush")

            management.call_command("stageusers", options['user_count'])
            management.call_command("stagepolls")
        else:
            Exception('Stagedata is only available when debug is true!')

