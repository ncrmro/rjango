import graphene

from features.mutations import FeatureMutations
from features.queries import FeatureQueries
from todos.schema import TodoQueries, TodoMutations
from polls.schema import PollQueries
from users.mutations import UserMutations
from users.queries import UserQueries


class Query(
    UserQueries,
    TodoQueries,
    FeatureQueries,
    PollQueries,
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
