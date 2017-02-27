from graphene import Node, Field, GlobalID, String
from graphene_django.types import DjangoObjectType, ObjectType
from django.contrib.auth import get_user_model
from .jwt_schema import TokensInterface


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
        interfaces = (Node,TokensInterface)


class Viewer(ObjectType):
    id = GlobalID()
    user = Field(UserNode, jwt_token=String())

    class Meta:
        interfaces = (TokensInterface,)
