from graphene import AbstractType, Node, Field, String, relay, ObjectType, Int, Boolean, ID, InputObjectType
from django.contrib.auth.models import AnonymousUser, User
from graphene import AbstractType, Node, relay
from graphene_django.filter import DjangoFilterConnectionField
from graphene_django.types import DjangoObjectType
from .jwt_util import loginUser


class UserNode(DjangoObjectType):
    is_authenticated = Boolean()
    is_anonymous = Boolean()
    class Meta:
        model = User
        only_fields = (
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


class Login(ObjectType):
    viewer = Field(UserNode)
    jwt_token = String()


class LoginAuthToken(ObjectType):
    viewer = Field(UserNode)


class UserQueries(AbstractType):
    user = Field(UserNode)
    all_users = DjangoFilterConnectionField(UserNode)
    viewer = Field(LoginAuthToken, jwt_token=String())

    def resolve_viewer(self, args, context, info):
        if args.get('jwt_token') == "":
            anon = AnonymousUser
            viewer = UserNode(
                id=anon.id,
                username=anon.username,
                is_authenticated=anon.is_authenticated,
                is_anonymous=anon.is_anonymous,
            )
        else:
            viewer = AnonymousUser
        return LoginAuthToken(viewer=viewer)

    login = Field(Login, username=String(), password=String())
    login_auth_token = Field(LoginAuthToken, jwt_token=String())

    def resolve_login(self, args, context, info):
        username = args.get('username')
        password = args.get('password')
        jwt_token = loginUser(username, password)
        viewer = User.objects.get(username=username)
        return Login(viewer, jwt_token=jwt_token)


class LogInUser(relay.ClientIDMutation):
    class Input:
        username = String(required=True)
        password = String(required=True)

    viewer = Field(UserNode)
    jwt_token = String()

    @classmethod
    def mutate_and_get_payload(cls, input, context, info):
        username = input.get('username')
        password = input.get('password')
        jwt_token = loginUser(username, password)
        viewer = User.objects.get(username=username)
        return LogInUser(viewer, jwt_token=jwt_token)


class UserMutations(AbstractType):
    login_user = LogInUser.Field()
