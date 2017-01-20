from graphene import AbstractType, Node, Field, String, relay, ObjectType, Int
from graphene_django.filter import DjangoFilterConnectionField
from graphene_django.types import DjangoObjectType

from .models import TodoModel


class TodoNode(DjangoObjectType):
    class Meta:
        model = TodoModel
        interfaces = (Node,)


class CreateTodo(relay.ClientIDMutation):
    class Input:
        user_id = Int(required=True)
        text = String(required=True)

    todo = Field(TodoNode)

    @classmethod
    def mutate_and_get_payload(cls, input, context, info):
        user_id = input.get('user_id')
        text = input.get('text')
        todo = TodoModel.objects.create(user_id=user_id, text=text)
        return CreateTodo(todo=todo)


class Query(AbstractType):
    todo = Node.Field(TodoNode)
    all_todos = DjangoFilterConnectionField(TodoNode)


class Mutation(AbstractType):
    create_todo = CreateTodo.Field()
