from graphene import AbstractType, Field, String
from .schema import Viewer
from django.contrib.auth import get_user_model

from .jwt_handlers import jwt_decode_handler


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
