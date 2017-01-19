from graphene import AbstractType, Node
from graphene_django.filter import DjangoFilterConnectionField
from graphene_django.types import DjangoObjectType

from .models import TodoModel


class TodoNode(DjangoObjectType):
    class Meta:
        model = TodoModel
        interfaces = (Node,)


class Query(AbstractType):
    todo = Node.Field(TodoNode)
    all_todos = DjangoFilterConnectionField(TodoNode)
