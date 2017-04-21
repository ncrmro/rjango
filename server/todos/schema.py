from graphene import AbstractType, Node, Field, String, relay, ObjectType, \
    lazy_import
from graphene_django import DjangoConnectionField
from graphene_django.types import DjangoObjectType
from .models import TodoModel


class TodoNode(DjangoObjectType):
    class Meta:
        model = TodoModel
        interfaces = (Node,)


class TodoEdge(ObjectType):
    node = Field(TodoNode)
    cursor = String()


class CreateTodo(relay.ClientIDMutation):
    class Input:
        text = String(required=True)

    todo_edge = Field(TodoEdge)
    viewer = Field(lazy_import('users.schema.Viewer'))

    @classmethod
    def mutate_and_get_payload(cls, input, context, info):
        text = input.get('text')
        todo = TodoModel.objects.create(user_id=user_id, text=text)
        return CreateTodo(todo=todo)


class TodoQueries(AbstractType):
    todo = Node.Field(TodoNode)
    all_todos = DjangoConnectionField(TodoNode)


class TodoMutations(AbstractType):
    create_todo = CreateTodo.Field()
