from django.contrib.auth import get_user_model
from graphene import AbstractType, relay, Field, String
from .schema import Viewer
from jwt_auth import settings
from django.contrib.auth import get_user_model

jwt_decode_handler = settings.JWT_DECODE_HANDLER


class UserQueries(AbstractType):
    viewer = Field(Viewer, jwt_token=String())

    @staticmethod
    def resolve_viewer(self, args, context, info):
        token = args['jwt_token']

        try:
            decoded_token = jwt_decode_handler(token)
            user = get_user_model().objects.get(id=decoded_token['user_id'])
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