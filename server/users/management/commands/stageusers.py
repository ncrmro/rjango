import datetime

from dateutil import tz
from django.conf import settings
from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand
from faker import Factory

first_date = datetime.datetime(2016, 1, 1, 1, 00)
last_date = datetime.datetime(2017, 1, 1, 1, 00)

def create_test_admin(users):
    """Create admin user if none exist"""
    if not users:
        get_user_model().objects.create_superuser(
            email="admin@test.com",
            password="test_password",
            first_name="John",
            last_name="Doe",
        )

fake = Factory.create()
fake.seed(4321)

def generate_fake_users(number_of_users=25):
    """Generate 10 fake users"""
    for _ in range(0, number_of_users):
        fake_user = fake.profile()
        name = fake_user['name']
        first_name = name.split()[0]
        last_name = name.split()[1]

        join_date = fake.date_time_between_dates(datetime_start=first_date,
                                                 datetime_end=last_date,
                                                 tzinfo=tz.tzutc())

        get_user_model().objects.get_or_create(
            email=fake_user['mail'],
            first_name=first_name,
            last_name=last_name,
            date_joined=join_date
        )

class Command(BaseCommand):
    """Create admin and fake users"""

    help = 'Import Volunteers from CSV'

    def add_arguments(self, parser):
        """Amount of users to create"""
        parser.add_argument('count', type=int, default=25)

    def handle(self, **options):
        count = options['count']
        users = get_user_model().objects.all()
        if settings.DEBUG:
            create_test_admin(users)
            generate_fake_users(count)
