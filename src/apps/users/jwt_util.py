from jwt_auth.mixins import JSONWebTokenAuthMixin
from calendar import timegm
from datetime import datetime
from jwt_auth import settings, exceptions
from jwt_auth.utils import get_authorization_header
from jwt_auth.compat import json, smart_text
from django.contrib.auth import get_user_model
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


def loginUser(email, password):
    """Should login user and return a jwt token, piggyback on jwt_auth"""
    user = get_user_model().objects.get(email=email)
    is_password_correct = user.check_password(password)
    if is_password_correct:
        jwt_token = get_jwt_token(user)
        return jwt_token


def authenticate(request):
    auth = get_authorization_header(request).split()
    auth_header_prefix = settings.JWT_AUTH_HEADER_PREFIX.lower()
    if not auth or smart_text(auth[0].lower()) != auth_header_prefix:
        raise exceptions.AuthenticationFailed()

    if len(auth) == 1:
        msg = 'Invalid Authorization header. No credentials provided.'
        raise exceptions.AuthenticationFailed(msg)
    elif len(auth) > 2:
        msg = ('Invalid Authorization header. Credentials string '
               'should not contain spaces.')
        raise exceptions.AuthenticationFailed(msg)

    try:
        payload = jwt_decode_handler(auth[1])
    except jwt.ExpiredSignature:
        msg = 'Signature has expired.'
        raise exceptions.AuthenticationFailed(msg)
    except jwt.DecodeError:
        msg = 'Error decoding signature.'
        raise exceptions.AuthenticationFailed(msg)

    user = authenticate_credentials(payload)

    return user


def authenticate_credentials(payload):
    """
    Returns an active user that matches the payload's user id and email.
    """
    try:
        user_id = jwt_get_user_id_from_payload(payload)

        if user_id:
            user = get_user_model().objects.get(pk=user_id, is_active=True)
        else:
            msg = 'Invalid payload'
            raise exceptions.AuthenticationFailed(msg)
    except get_user_model().DoesNotExist:
        msg = 'Invalid signature'
        raise exceptions.AuthenticationFailed(msg)

    return user
