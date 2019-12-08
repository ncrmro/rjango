from django.contrib.auth import get_user_model
from graphene import Field, GlobalID, String
from graphene_django import DjangoObjectType
from graphene import relay, ObjectType
from polls.schema import PollQueries
from users.jwt_schema import TokensInterface

class UserNode(DjangoObjectType):
    class Meta:
        model = get_user_model()
        only_fields = (
            'id',
            'last_login',
            'is_superuser',
            'username',
            'first_name',
            'last_name',
            'email',
            'is_staff',
            'is_active',
            'date_joined',
        )
        interfaces = (relay.Node, TokensInterface)


class Viewer(PollQueries, ObjectType):
    id = GlobalID()
    user = Field(UserNode, jwt_token=String())

    class Meta:
        interfaces = (relay.Node, TokensInterface,)
