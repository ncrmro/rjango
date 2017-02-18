"""Import Volunteers from CSV"""
import csv
import os

from django.conf import settings
from django.contrib.auth.models import User, Group
from django.core.management.base import BaseCommand

from random import randint
import random
from django.contrib.auth import get_user_model



def create_test_admin(users):
    """Create admin user if none exist"""
    if not users:
        user = get_user_model().objects.create_superuser(
            username="admin",
            email="admin@test.com",
            password="test_password",
            first_name="John",
            last_name="Doe",
        )


class Command(BaseCommand):
    """Create admin and fake users"""

    help = 'Import Volunteers from CSV'

    def handle(self, **options):
        users = get_user_model().objects.all()
        if settings.DEBUG:
            create_test_admin(users)