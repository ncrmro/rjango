import datetime

import factory
import pytz
from django.contrib.auth import get_user_model

from .models import Choice, Vote
from .models import Question
import random
questions = [
    'Do andriods dream of sleep',
    'Will we make it to mars',
    'Whose the smartest of them all'
]
pub_date = factory.LazyFunction(lambda: datetime.datetime.now(tz=pytz.UTC))


class QuestionFactory(factory.DjangoModelFactory):
    class Meta:
        model = Question

    user = factory.Iterator(get_user_model().objects.all())
    question_text = factory.Iterator(questions)
    pub_date = pub_date


class ChoiceFactory(factory.DjangoModelFactory):
    class Meta:
        model = Choice

    choice_text = factory.Iterator(['yes', 'no'])
    question = factory.Iterator(Question.objects.all())


class VoteFactory(factory.DjangoModelFactory):
    class Meta:
        model = Vote

    selected_choice = factory.SubFactory(ChoiceFactory)
    question = factory.SubFactory(QuestionFactory)
    user = factory.Iterator(get_user_model().objects.all())


class ChoiceWithVotesFactor(ChoiceFactory):
    vote = factory.RelatedFactory(
            VoteFactory,
            'selected_choice',

    )


class QuestionWithChoicesFactor(QuestionFactory):
    choice = factory.RelatedFactory(
            ChoiceWithVotesFactor,
            'question',
            choice_text='yes'
    )
    choice1 = factory.RelatedFactory(
            ChoiceWithVotesFactor,
            'question',
            choice_text='no'
    )


def stage_votes(users, questions):
    for user in users:
        questions_user_hasnt_voted = questions.exclude(vote__user_id=user.id)

        question = random.choice(questions_user_hasnt_voted)
        choice = question.choice_set.all()
        if choice:
            choice = random.choice(choice)
            VoteFactory(
                    user=user,
                    question=question,
                    selected_choice=choice

            )
def stage_polls():
    QuestionWithChoicesFactor(
            question_text='Do andriods dream of sheep'
    )
    QuestionWithChoicesFactor(
            question_text='Will we make it to mars'
    )
    questions = Question.objects.all()
    users = get_user_model().objects.all()
    stage_votes(users,questions)
    stage_votes(users, questions)

