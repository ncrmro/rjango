from graphene import Node, Field, String, ObjectType, Interface
from graphene_django.filter import DjangoFilterConnectionField
from graphene_django.types import DjangoObjectType

from .models import FeatureModel


class FeatureNode(DjangoObjectType):
    class Meta:
        model = FeatureModel
        interfaces = (Node,)


class FeatureInterface(Interface):
    """Used by the viewer object to return features"""
    features = DjangoFilterConnectionField(FeatureNode)


class FeatureEdge(ObjectType):
    """Used during mutations"""
    node = Field(FeatureNode)
    cursor = String()
