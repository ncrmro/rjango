import graphene
from graphene_django.debug import DjangoDebug
from todos.schema import TodoQueries, TodoMutations
from users.schema import UserQueries, UserMutations


class Query(UserQueries, TodoQueries, graphene.ObjectType):
    debug = graphene.Field(DjangoDebug, name='__debug')


class Mutation(UserMutations, TodoMutations, graphene.ObjectType):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)
