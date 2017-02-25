from graphene import relay, String, Field
from .schema import Viewer
from .jwt_util import loginUser
from .jwtSchema import TokenUnion, TokensSuccess, TokenError


class CreateToken(relay.ClientIDMutation):
    class Input:
        email = String(required=True)
        password = String(required=True)

    viewer = Field(Viewer)
    tokens = Field(TokenUnion)

    @classmethod
    def mutate_and_get_payload(cls, input, context, info):
        print("Logging user in", input, context, info)
        email = input.get('email')
        password = input.get('password')
        user, jwt_token = loginUser(email, password)
        viewer = Viewer(
            user=user,
        )
        if jwt_token:
            tokens = TokensSuccess(
                jwt_token
            )
        else:
            tokens = TokenError(
                error="Error!"
            )
        return CreateToken(viewer, tokens)