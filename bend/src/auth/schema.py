import graphene
from django.contrib.auth.models import AnonymousUser, User
from graphene import AbstractType, Node
from graphene_django.filter import DjangoFilterConnectionField
from graphene_django.types import DjangoObjectType


class UserNode(DjangoObjectType):
    class Meta:
        model = User
        interfaces = (Node,)


class CurrentUser(graphene.ObjectType):
    id = graphene.ID()
    username = graphene.String()
    is_anonymous = graphene.Boolean()
    is_authenticated = graphene.Boolean()
    is_staff = graphene.Boolean()
    is_active = graphene.Boolean()


class Query(AbstractType):
    user = Node.Field(UserNode)
    all_users = DjangoFilterConnectionField(UserNode)

    current_user = graphene.Field(CurrentUser)

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
