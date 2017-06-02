import graphene
from graphene_django.filter import DjangoFilterConnectionField
from graphene_django.types import DjangoObjectType

from .models import Question as QuestionModal, Choice as ChoiceModal


class Question(DjangoObjectType):
    class Meta:
        model = QuestionModal
        interfaces = (graphene.Node,)


class Choice(DjangoObjectType):
    class Meta:
        model = ChoiceModal
        interfaces = (graphene.Node,)


class PollQueries(graphene.AbstractType):
    question = graphene.Node.Field(Question)
    questions = DjangoFilterConnectionField(Question)

    def resolve_questions(self, args, context, info):
        issues = QuestionModal.objects
        order_by = args.get('order_by')
        if order_by:
            issues.order_by(order_by)

        return issues

class Vote(graphene.relay.ClientIDMutation):
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

        selected_choice.votes += 1
        selected_choice.save()

        return Vote(question=question)

class PollMutations(graphene.AbstractType):
    vote = Vote.Field()
