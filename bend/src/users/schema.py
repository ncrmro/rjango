from graphene import AbstractType, Node, Field, String, relay, ObjectType, Int, Boolean, ID
from django.contrib.auth.models import AnonymousUser, User
from graphene import AbstractType, Node, relay
from graphene_django.filter import DjangoFilterConnectionField
from graphene_django.types import DjangoObjectType
from .jwt_util import loginUser


class UserNode(DjangoObjectType):
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


class CurrentUser(ObjectType):
    id = ID()
    username = String()
    password = String()
    is_anonymous = Boolean()
    is_authenticated = Boolean()
    is_staff = Boolean()
    is_active = Boolean()


class UserQueries(AbstractType):
    user = Node.Field(UserNode)
    all_users = DjangoFilterConnectionField(UserNode)

    current_user = Field(CurrentUser)

    def resolve_current_user(self, args, context, info):
        anon = AnonymousUser
        return CurrentUser(
            id=anon.id,
            username=anon.username,
            is_anonymous=anon.is_anonymous,
            is_authenticated=anon.is_authenticated,
            is_staff=anon.is_staff,
            is_active=anon.is_active,
        )


class LogInUser(relay.ClientIDMutation):
    class Input:
        username = String(required=True)
        password = String(required=True)

    user = Field(UserNode)
    token = String()

    @classmethod
    def mutate_and_get_payload(cls, input, context, info):
        username = input.get('username')
        password = input.get('password')
        token = loginUser(username, password)
        return LogInUser(token=token)


class UserMutations(AbstractType):
    login_user = LogInUser.Field()
