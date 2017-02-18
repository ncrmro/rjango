from django.contrib.auth.hashers import check_password
from django.contrib.auth import get_user_model
from django.contrib.auth.backends import ModelBackend
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import User


class UserModelEmailBackend(ModelBackend):
    def authenticate(self, username="", password="", **kwargs):
        try:
            user = get_user_model().objects.get(email__iexact=username)
            if check_password(password, user.password):
                return user
            else:
                return None
        except get_user_model().DoesNotExist:
            # No user was found, return None - triggers default login failed
            return None


def normalize_email(email):
    """
    Normalize the email address by lowercasing the domain part of it.
    Pulled from BaseUserManager in base_user.pys
    """
    email = email or ''
    try:
        email_name, domain_part = email.strip().rsplit('@', 1)
    except ValueError:
        pass
    else:
        email = '@'.join([email_name, domain_part.lower()])
    return email


def _create_user(email, password, **extra_fields):
    """
    Creates and saves a User with the given email and password.
    """
    if not email:
        raise ValueError('The given email must be set')

    is_email_in_use = User.objects.filter(email=email)
    if is_email_in_use:
        raise ValueError('Email is in use already')

    email = normalize_email(email)
    user = User(email=email, **extra_fields)
    user.set_password(password)
    user.save()
    return user
