from calendar import timegm
from datetime import datetime
from django.contrib.auth import authenticate
from django.conf import settings

from .jwt_handlers import jwt_encode_handler, jwt_payload_handler


def get_jwt_token(user):
    payload = jwt_payload_handler(user)
    # Include original issued at time for a brand new token,
    # to allow token refresh
    if settings.JWT_ALLOW_REFRESH:
        payload['orig_iat'] = timegm(
            datetime.utcnow().utctimetuple()
        )
    payload = jwt_encode_handler(payload)
    return payload


def login_user(email, password):
    """Should login user and return a jwt token, piggyback on jwt_auth"""
    # Django authenticate method must use username which is actually email!
    user = authenticate(username=email, password=password)
    if user:
        jwt_token = get_jwt_token(user)
        return user, jwt_token


def get_authorization_header(request):
    """
    Return request's 'Authorization:' header, as a bytestring.
    From: https://github.com/tomchristie/django-rest-framework/blob/master/rest_framework/authentication.py
    """
    auth = request.META.get('HTTP_AUTHORIZATION', b'')

    if isinstance(auth, type('')):
        # Work around django test client oddness
        auth = auth.encode('iso-8859-1')

    return auth
