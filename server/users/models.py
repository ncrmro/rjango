from custom_user.models import AbstractEmailUser
from django.db import models


class CustomUser(AbstractEmailUser):
    """
    Example of an EmailUser with a new field date_of_birth
    """
    username = models.CharField(max_length=30, blank=True)
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)
    date_of_birth = models.DateField(null=True, blank=True)
