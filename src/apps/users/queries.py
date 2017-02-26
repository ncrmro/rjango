from graphene import AbstractType, Field, String
from .schema import Viewer
from django.contrib.auth import get_user_model
from .jwt_util import get_authorization_header
from .jwt_handlers import jwt_encode_handler, jwt_decode_handler, jwt_payload_handler


def check_for_token(args, context):
    print("check_for_tokens")
    auth = get_authorization_header(context).split()
    if args:
        token = args["jwt_token"]
        token = bytes(token, 'utf-8')
        return token
    elif context:
        try:
            token = auth[1]
            return token
        except:
            return False


class UserQueries(AbstractType):
    viewer = Field(Viewer, jwt_token=String())

    @staticmethod
    def resolve_viewer(self, args, context, info):
        token = check_for_token(args, context)
        print(token)
        try:
            token_payload = jwt_decode_handler(token)
            token_user_id = token_payload['user_id']
            user = get_user_model().objects.get(id=token_user_id)
            print(user)
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
