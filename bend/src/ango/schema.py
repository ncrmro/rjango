import graphene
from graphene_django.debug import DjangoDebug

import todos.schema


class Query(todos.schema.Query, graphene.ObjectType):
    debug = graphene.Field(DjangoDebug, name='__debug')


class Mutation(todos.schema.Mutation, graphene.ObjectType):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)
