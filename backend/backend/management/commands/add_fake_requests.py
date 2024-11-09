from django.core.management.base import BaseCommand
from faker import Faker
import random

from backend.models import User, JobListing, Request


class Command(BaseCommand):
    help = "Generate fake requests from users to job listings"

    def handle(self, *args, **kwargs):
        faker = Faker()
        users = User.objects.all()
        job_listings = JobListing.objects.all()

        if not users.exists() or not job_listings.exists():
            self.stdout.write(
                self.style.ERROR("No users or job listings found to generate requests.")
            )
            return

        # Define possible number of requests per user
        min_requests_per_user = 1
        max_requests_per_user = 5

        # Generate requests for each user
        for user in users:
            # Randomly decide the number of requests for this user
            num_requests = random.randint(min_requests_per_user, max_requests_per_user)

            for _ in range(num_requests):
                job_listing = random.choice(
                    job_listings
                )  # Randomly select a job listing
                status = "pending"  # Default status

                # Check if the request already exists to avoid duplicates
                if not Request.objects.filter(
                    user=user, job_listing=job_listing
                ).exists():
                    # Create the request
                    Request.objects.create(
                        user=user,
                        job_listing=job_listing,
                        status=status,
                        created_at=faker.date_time_between(
                            start_date="-1y", end_date="now"
                        ),
                    )

        self.stdout.write(
            self.style.SUCCESS(
                "Successfully added fake requests from users to job listings"
            )
        )
