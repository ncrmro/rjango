from graphene import AbstractType, Node, relay, Field, String, GlobalID
from graphene_django.types import DjangoObjectType, ObjectType
from .jwt_util import loginUser, authenticate
from features.schema import FeatureInterface
from django.contrib.auth import get_user_model

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
    jwt_token = String()

    class Meta:
        interfaces = (FeatureInterface,)


class UserQueries(AbstractType):
    viewer = Field(Viewer)

    @staticmethod
    def resolve_viewer(self, args, context, info):
        try:
            user = authenticate(context)
            return Viewer(
                id=0,
                user=user
            )
        except:
            return Viewer(
                id=0,
                user=get_user_model()(
                    id=0,
                    email=""
                )
            )


class LogInUser(relay.ClientIDMutation):
    class Input:
        email = String(required=True)
        password = String(required=True)

    viewer = Field(Viewer)

    @classmethod
    def mutate_and_get_payload(cls, input, context, info):
        print("Logging user in", input, context, info)
        email = input.get('email')
        password = input.get('password')
        jwt_token = loginUser(email, password)
        print("jwt token", jwt_token)
        user = get_user_model().objects.get(email=email)
        viewer = Viewer(
            user=user,
            jwt_token=jwt_token
        )
        return LogInUser(viewer)


class CreateUser(relay.ClientIDMutation):
    class Input:
        email = String(required=True)
        password = String(required=True)

    viewer = Field(UserNode)
    jwt_token = String()

    @classmethod
    def mutate_and_get_payload(cls, input, context, info):
        print("Logging user in", input, context, info)
        email = input.get('email')
        password = input.get('password')
        viewer = get_user_model().objects.create_user(email=email, password=password)
        jwt_token = loginUser(email, password)
        return CreateUser(viewer, jwt_token)


class UserMutations(AbstractType):
    login_user = LogInUser.Field()
    create_user = CreateUser.Field()
