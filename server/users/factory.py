import factory
from django.contrib.auth import get_user_model


def create_test_admin(users):
    """Create admin user if none exist"""
    if not users:
        get_user_model().objects.create_superuser(
                email="admin@test.com",
                password="test_password",
                first_name="John",
                last_name="Doe",
        )


class UserFactory(factory.DjangoModelFactory):
    class Meta:
        model = get_user_model()

    email = factory.Faker('email')
    first_name = factory.Faker('first_name')
    last_name = factory.Faker('last_name')


def generate_fake_users(number_of_users=25):
    """Generate 10 fake users"""
    for _ in range(0, number_of_users):
        UserFactory()
