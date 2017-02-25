from jwt_auth.mixins import JSONWebTokenAuthMixin
from calendar import timegm
from datetime import datetime
from jwt_auth import settings, exceptions
from jwt_auth.utils import get_authorization_header
from jwt_auth.compat import json, smart_text
from django.contrib.auth import get_user_model, authenticate
from jwt_auth.forms import JSONWebTokenForm

jwtMixin = JSONWebTokenAuthMixin.authenticate_header

import jwt

jwt_payload_handler = settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = settings.JWT_ENCODE_HANDLER
jwt_decode_handler = settings.JWT_DECODE_HANDLER
jwt_get_user_id_from_payload = settings.JWT_PAYLOAD_GET_USER_ID_HANDLER


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


def loginUser(email, password):
    """Should login user and return a jwt token, piggyback on jwt_auth"""
    user = authenticate(email=email, password=password)
    if user:
        jwt_token = get_jwt_token(user)
        return user, jwt_token
