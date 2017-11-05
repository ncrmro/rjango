from django.contrib.postgres.search import TrigramSimilarity

from polls.models import Question


def trigram_similarity_search(similarity=0.3, search_string=""):
    question = Question.objects
    question = question.annotate(similarity=TrigramSimilarity('question_text', search_string))
    question = question.filter(similarity__gt=similarity)

    return question
