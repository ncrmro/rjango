import graphene

from features.mutations import FeatureMutations
from features.queries import FeatureQueries
from todos.schema import TodoQueries, TodoMutations
from polls.schema import PollQueries
from polls.schema import PollMutations
from users.schema import UserQueries, UserMutations


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
    PollMutations,
    graphene.ObjectType
):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)
