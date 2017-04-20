from datetime import datetime

import jwt
from django.conf import settings


def jwt_payload_handler(user):
    return {
        'user_id': user.pk,
        'email': user.email,
        'exp': datetime.utcnow() + settings.JWT_EXPIRATION_DELTA
    }


def jwt_encode_handler(payload):
    return jwt.encode(
        payload,
        settings.JWT_SECRET_KEY,
        settings.JWT_ALGORITHM
    ).decode('utf-8')


def jwt_decode_handler(token):
    options = {
        'verify_exp': settings.JWT_VERIFY_EXPIRATION,
    }

    return jwt.decode(
        token,
        settings.JWT_SECRET_KEY,
        settings.JWT_VERIFY,
        options=options,
        leeway=settings.JWT_LEEWAY
    )
