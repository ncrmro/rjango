from graphene import AbstractType, Node, relay, Field, String, GlobalID, Union, Connection
from graphene_django.types import DjangoObjectType, ObjectType
from features.schema import FeatureInterface
from django.contrib.auth import get_user_model
from jwt_auth import settings
from .jwtSchema import TokensInterface

jwt_encode_handler = settings.JWT_ENCODE_HANDLER
jwt_decode_handler = settings.JWT_DECODE_HANDLER
jwt_get_user_id_from_payload = settings.JWT_PAYLOAD_GET_USER_ID_HANDLER


class UserNode(DjangoObjectType):
    class Meta:
        model = get_user_model()
        only_fields = (
            'id',
            'last_login',
            'is_superuser',
            'first_name',
            'last_name',
            'email',
            'is_staff',
            'is_active',
            'date_joined',
            'todomodel'
        )
        interfaces = (Node,)


class Viewer(ObjectType):
    id = GlobalID()
    user = Field(UserNode)

    class Meta:
        interfaces = (TokensInterface,)





