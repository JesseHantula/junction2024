from django.core.management.base import BaseCommand
from faker import Faker
import random

from backend.models import Company


class Command(BaseCommand):
    help = "Generate fake company"

    def handle(self, *args, **kwargs):
        faker = Faker()
        values = [
                    'Honesty',
                    'Integrity',
                    'Teamwork',
                    'Innovation',
                    'Excellence',
                    'Respect',
                    'Accountability',
                    'Passion',
                    'Courage',
                    'Empathy',
                  ]

        for _ in range(1000):
            company_name = f"{faker.company()}_{random.randint(1, 20)}"
            company = Company.objects.create(
                name=company_name,
                password=faker.password(),
                values = random.sample(values, 3),
                work_life_balance=random.randint(1, 10),
                flexibility=random.randint(1, 10),
                mental_health=random.randint(1, 10)
            )
            company.save()

        self.stdout.write(self.style.SUCCESS("Successfully added fake data"))