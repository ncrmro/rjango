from calendar import timegm
from datetime import datetime
from django.contrib.auth import authenticate
from django.conf import settings

from .jwt_handlers import jwt_encode_handler, jwt_decode_handler, jwt_payload_handler


def check_for_token(args, context):
    print("check_for_tokens")
    auth = get_authorization_header(context).split()
    if args:
        token = args["jwt_token"]
        token = bytes(token, 'utf-8')
        return token
    elif context:
        try:
            token = auth[1]
            return token
        except:
            return False


def get_token_user_id(args, context):
    """If a valid token is found we can trust user id in token payload"""
    token = check_for_token(args, context)
    token_payload = jwt_decode_handler(token)
    token_user_id = token_payload['user_id']
    return token_user_id

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
