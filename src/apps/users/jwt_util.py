from jwt_auth.forms import JSONWebTokenForm
from jwt_auth.mixins import JSONWebTokenAuthMixin

jwtMixin = JSONWebTokenAuthMixin.authenticate_header

import jwt

from jwt_auth import settings, exceptions
from jwt_auth.utils import get_authorization_header
from jwt_auth.compat import json, smart_text, User

jwt_decode_handler = settings.JWT_DECODE_HANDLER
jwt_get_user_id_from_payload = settings.JWT_PAYLOAD_GET_USER_ID_HANDLER


def loginUser(username, password):
    """Should login user and return a jwt token, piggyback on jwt_auth"""
    request = {"username": username, "password": password}
    form = JSONWebTokenForm(request)
    if not form.is_valid():
        return print("JWT form not valid")

    return form.object['token']


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
        print(msg, auth[1])
        raise exceptions.AuthenticationFailed(msg)
    except jwt.DecodeError:
        msg = 'Error decoding signature.'
        raise exceptions.AuthenticationFailed(msg)

    user = authenticate_credentials(payload)

    return (user, auth[1])


def authenticate_credentials(payload):
    """
    Returns an active user that matches the payload's user id and email.
    """
    try:
        user_id = jwt_get_user_id_from_payload(payload)

        if user_id:
            user = User.objects.get(pk=user_id, is_active=True)
        else:
            msg = 'Invalid payload'
            raise exceptions.AuthenticationFailed(msg)
    except User.DoesNotExist:
        msg = 'Invalid signature'
        raise exceptions.AuthenticationFailed(msg)

    return user


def authenticateGraphQLContext(context):
    check_token = authenticate(context)
    print('Found Token in Auth Header', check_token)
    token_user = check_token[0]
    user = User.objects.get(id=token_user.id, username=token_user.username)
    return user
