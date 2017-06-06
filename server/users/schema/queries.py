from django.contrib.auth import get_user_model
from graphene import AbstractType, Field, String

from users.jwt_util import get_token_user_id
from .definitions import Viewer


class UserQueries(AbstractType):
    viewer = Field(Viewer)

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
        except BaseException:
            return Viewer(
                id=0,
                user=get_user_model()(
                    id=0,
                    email=""
                )
            )
