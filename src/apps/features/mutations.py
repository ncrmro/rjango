from graphene import AbstractType, Field, String, relay, Int

from users.schema import Viewer
from .models import FeatureModel
from .schema import FeatureEdge


class CreateFeature(relay.ClientIDMutation):
    class Input:
        user_id = Int(required=True)
        text = String(required=True)

    feature_edge = Field(FeatureEdge)
    viewer = Field(Viewer)

    @classmethod
    def mutate_and_get_payload(cls, input, context, info):
        user_id = input.get('user_id')
        text = input.get('text')
        features = FeatureModel.objects.create(user_id=user_id, text=text)
        return CreateFeature(features=features)


class FeatureMutations(AbstractType):
    create_feature = CreateFeature.Field()
