from graphene import AbstractType, Node, Field, String, relay, ObjectType, Int, Boolean, ID, InputObjectType
from django.contrib.auth.models import AnonymousUser, User
from graphene import AbstractType, Node, relay
from graphene_django.filter import DjangoFilterConnectionField
from graphene_django.types import DjangoObjectType
from .jwt_util import loginUser, authenticate
from jwt_auth import settings, exceptions
import jwt

jwt_decode_handler = settings.JWT_DECODE_HANDLER


class UserNode(DjangoObjectType):
    class Meta:
        model = User
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
            'todomodel'
        )
        interfaces = (Node,)


class UserQueries(AbstractType):
    user = Field(UserNode)
    all_users = DjangoFilterConnectionField(UserNode)
    viewer = Field(UserNode)

    def resolve_viewer(self, args, context, info):
        try:
            check_token = authenticate(context)
            print('Found Token in Auth Header', check_token)
            token_user = check_token[0]
            user = User.objects.get(id=token_user.id, username=token_user.username)
            return user
        except:
            return User(
                id=0,
                username=""
            )


class LogInUser(relay.ClientIDMutation):
    class Input:
        username = String(required=True)
        password = String(required=True)

    viewer = Field(UserNode)
    jwt_token = String()

    @classmethod
    def mutate_and_get_payload(cls, input, context, info):
        print("Logging user in", input, context, info)
        username = input.get('username')
        password = input.get('password')
        jwt_token = loginUser(username, password)
        viewer = User.objects.get(username=username)
        return LogInUser(viewer, jwt_token)


class UserMutations(AbstractType):
    login_user = LogInUser.Field()
