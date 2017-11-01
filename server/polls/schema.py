import graphene
from graphene_django.filter import DjangoFilterConnectionField
from graphene_django.types import DjangoObjectType

from polls import models
from users.jwt_util import get_token_user_id
from .search import trigram_similarity_search


class Question(DjangoObjectType):
    class Meta:
        model = models.Question
        interfaces = (graphene.Node,)

    has_viewer_voted = graphene.Boolean()

    def resolve_has_viewer_voted(self, args, context, info):
        user_id = get_token_user_id(args='', context=context)
        if user_id:
            has_viewer_voted = bool(self.vote_set.filter(user_id=user_id))
            return has_viewer_voted
        else:
            return False


class Choice(DjangoObjectType):
    class Meta:
        model = models.Choice
        interfaces = (graphene.Node,)

    vote_count = graphene.Int()

    def resolve_vote_count(self, args, context, info):
        return self.vote_set.all().count()


class Vote(DjangoObjectType):
    class Meta:
        model = models.Vote
        interfaces = (graphene.Node,)


class PollQueries(graphene.AbstractType):
    question = graphene.Node.Field(Question)
    questions = DjangoFilterConnectionField(Question,
                                            search_string=graphene.String())

    def resolve_questions(self, args, context, info):
        questions = models.Question.objects
        order_by = args.get('order_by')
        if order_by:
            questions.order_by(order_by)
        search_string = args.get('search_string')
        if search_string:
            questions = trigram_similarity_search(0.006, search_string)
        return questions


class VoteMutation(graphene.relay.ClientIDMutation):
    class Input:
        question_id = graphene.GlobalID()
        choice_id = graphene.GlobalID()

    question = graphene.Field(Question)

    @classmethod
    def mutate_and_get_payload(cls, input, context, info):
        get_node = graphene.Node.get_node_from_global_id
        get_node_id = graphene.Node.from_global_id
        model_name, choice_id = get_node_id(input.get('choice_id'))

        question = get_node(input.get('question_id'), context, info)
        selected_choice = question.choice_set.get(id=choice_id)
        user_id = get_token_user_id(args='', context=context)

        selected_choice.vote_set.create(
                question=question,
                selected_choice=selected_choice,
                user_id=user_id
        )
        return VoteMutation(question=question)


class CreatePollMutation(graphene.relay.ClientIDMutation):
    class Input:
        question_text = graphene.String(required=True)
        choices = graphene.List(graphene.String, required=True )

    poll = graphene.Field(Question)

    @classmethod
    def mutate_and_get_payload(cls, input, context, info):
        user_id = get_token_user_id(input, context)
        poll = models.Question.objects.create(
                user_id=user_id,
                question_text=input.get('question_text')
        )

        choices = input.get('choices')
        for choice in choices:
            models.Choice.objects.create(
                    question=poll,
                    choice_text=choice,
            )

        return CreatePollMutation(poll=poll)


class PollMutations(graphene.AbstractType):
    vote = VoteMutation.Field()
    create_poll = CreatePollMutation.Field()
