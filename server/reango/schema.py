import graphene

from polls.schema import PollQueries
from polls.schema import PollMutations
from users.schema import UserQueries, UserMutations


class Query(
    UserQueries,
    PollQueries,
    graphene.ObjectType
):
    pass

class Mutation(
    UserMutations,
    PollMutations,
    graphene.ObjectType
):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)
