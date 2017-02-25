from graphene import AbstractType, relay, Field, String
from .schema import Viewer, UserNode
from .jwt_mutations import CreateToken
from .jwt_util import login_user
from django.contrib.auth import get_user_model


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
        jwt_token = login_user(email, password)
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
        jwt_token = login_user(email, password)
        return CreateUser(viewer, jwt_token)


class UserMutations(AbstractType):
    create_token = CreateToken.Field()
    login_user = LogInUser.Field()
    create_user = CreateUser.Field()
