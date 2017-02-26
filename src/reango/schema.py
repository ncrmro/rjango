import graphene
from graphene_django.debug import DjangoDebug
from todos.schema import TodoQueries, TodoMutations
from users.queries import UserQueries
from users.mutations import UserMutations
from features.queries import FeatureQueries
from features.mutations import FeatureMutations


class Query(
    UserQueries,
    TodoQueries,
    FeatureQueries,
    graphene.ObjectType
):
    debug = graphene.Field(DjangoDebug, name='__debug')


class Mutation(
    UserMutations,
    TodoMutations,
    FeatureMutations,
    graphene.ObjectType
):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)
