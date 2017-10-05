from django.conf import settings
from django.core.management.base import BaseCommand
from users.factory import create_test_admin, generate_fake_users
from django.contrib.auth import get_user_model
import sys

class Command(BaseCommand):

    def add_arguments(self, parser):
        parser.add_argument('count', type=int, default=25)

    def handle(self, **options):
        count = options['count']
        users = get_user_model().objects.all()
        # https://stackoverflow.com/questions/6957016/detect-django-testing-mode
        if settings.DEBUG or 'test' in sys.argv:
            create_test_admin(users)
            generate_fake_users(count)
