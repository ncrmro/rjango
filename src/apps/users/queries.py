from graphene import AbstractType, Field, String
from .schema import Viewer
from django.contrib.auth import get_user_model
from .jwt_util import get_token_user_id


class UserQueries(AbstractType):
    viewer = Field(Viewer, jwt_token=String())

    @staticmethod
    def resolve_viewer(self, args, context, info):

        try:
            token_user_id = get_token_user_id(args, context)
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
