from django.core.management.base import BaseCommand
from faker import Faker
import random

from backend.models import Company, CompanyReview


class Command(BaseCommand):
    help = "Generate fake reviews for companies"

    def handle(self, *args, **kwargs):
        faker = Faker()
        companies = Company.objects.all()

        if not companies.exists():
            self.stdout.write(
                self.style.ERROR("No companies found to generate reviews for.")
            )
            return

        # Define possible number of reviews per company
        min_reviews_per_company = 5
        max_reviews_per_company = 20

        # Generate reviews for each company
        for company in companies:
            # Randomly decide the number of reviews for this company
            num_reviews = random.randint(
                min_reviews_per_company, max_reviews_per_company
            )

            for _ in range(num_reviews):
                review_text = faker.paragraph(nb_sentences=5)
                stars = random.randint(1, 5)  # Randomly assign a rating between 1 and 5

                # Create the review for the company
                CompanyReview.objects.create(
                    company=company, review=review_text, stars=stars
                )

        self.stdout.write(
            self.style.SUCCESS("Successfully added fake reviews for companies")
        )
