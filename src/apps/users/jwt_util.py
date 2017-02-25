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


def check_jwt_token(token):
    jwt_encode_handler(token)


def login_user(email, password):
    """Should login user and return a jwt token, piggyback on jwt_auth"""
    user = authenticate(email=email, password=password)
    if user:
        jwt_token = get_jwt_token(user)
        return user, jwt_token
