import graphene
from graphene_django.debug import DjangoDebug

import auth.schema
import todos.schema


class Query(
    todos.schema.Query,
    auth.schema.Query,
    graphene.ObjectType
):
    debug = graphene.Field(DjangoDebug, name='__debug')


schema = graphene.Schema(query=Query)
