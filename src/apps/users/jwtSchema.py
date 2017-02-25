from graphene import relay, String, Union, Connection, Interface, Field
from graphene_django.types import ObjectType


from jwt_auth import settings

jwt_payload_handler = settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = settings.JWT_ENCODE_HANDLER
jwt_decode_handler = settings.JWT_DECODE_HANDLER
jwt_get_user_id_from_payload = settings.JWT_PAYLOAD_GET_USER_ID_HANDLER


class TokensSuccess(ObjectType):
    jwt_access_token = String()
    jwt_refresh_token = String()


class TokenError(ObjectType):
    error = String()


class TokenUnion(Union):
    class Meta:
        types = (TokensSuccess, TokenError)


class TokenConnection(Connection):
    class Meta:
        node = TokenUnion


class TokensInterface(Interface):
    tokens = Field(TokenUnion)



