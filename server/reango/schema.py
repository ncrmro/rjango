import graphene

from features.mutations import FeatureMutations
from features.queries import FeatureQueries
from todos.schema import TodoQueries, TodoMutations
from users.mutations import UserMutations
from users.queries import UserQueries


class Query(
    UserQueries,
    TodoQueries,
    FeatureQueries,
    graphene.ObjectType
):
    pass

class Mutation(
    UserMutations,
    TodoMutations,
    FeatureMutations,
    graphene.ObjectType
):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)
