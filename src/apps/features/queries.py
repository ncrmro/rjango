from graphene import AbstractType, Field
from graphene_django.filter import DjangoFilterConnectionField

from .schema import FeatureNode


class FeatureQueries(AbstractType):
    features = Field(FeatureNode)
    all_features = DjangoFilterConnectionField(FeatureNode)