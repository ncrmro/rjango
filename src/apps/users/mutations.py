from graphene import AbstractType, relay, Field, String, ObjectType, Union
from .schema import Viewer
from .jwt_schema import TokensSuccess, TokenError
from .jwt_util import get_jwt_token
from django.contrib.auth import authenticate, get_user_model


class AuthFormError(ObjectType):
    """Error returned when"""
    error = String()


class AuthFormUnion(Union):
    """Returns either token error or token success"""

    class Meta:
        types = (Viewer, AuthFormError)


class LogInUser(relay.ClientIDMutation):
    class Input:
        email = String(required=True)
        password = String(required=True)

    auth_form_payload = Field(AuthFormUnion)

    @classmethod
    def mutate_and_get_payload(cls, input, context, info):
        print("Logging user in", input, context, info)
        email = input.get('email')
        password = input.get('password')
        user_exists = get_user_model().objects.filter(email=email)
        if not user_exists:
            error = AuthFormError(error="User doesn't exist")
            return LogInUser(error)
        user_password_correct = user_exists[0].check_password(password)
        if not user_password_correct:
            print(user_password_correct)
            error = AuthFormError(error="Password is incorrect")

            return LogInUser(error)

        user = authenticate(username=email, password=password)
        jwt_token = get_jwt_token(user)

        if user and jwt_token:
            tokens = TokensSuccess(
                jwt_token
            )
            viewer = Viewer(
                user=user,
                tokens=tokens
            )
            return LogInUser(viewer)


class CreateUser(relay.ClientIDMutation):
    class Input:
        email = String(required=True)
        password = String(required=True)

    auth_form_payload = Field(AuthFormUnion)

    @classmethod
    def mutate_and_get_payload(cls, input, context, info):
        print("Logging user in", input, context, info)
        email = input.get('email')
        password = input.get('password')
        user_exists = get_user_model().objects.filter(email=email)
        if not user_exists:
            user = get_user_model().objects.create_user(email=email, password=password)
            jwt_token = get_jwt_token(user)
            token = TokensSuccess(
                token=jwt_token
            )
            viewer = Viewer(
                user=user,
                tokens=token
            )
            return CreateUser(viewer)
        if user_exists:
            error = AuthFormError(
                error="User exists"
            )
            return CreateUser(error)


class UserMutations(AbstractType):
    login_user = LogInUser.Field()
    create_user = CreateUser.Field()
