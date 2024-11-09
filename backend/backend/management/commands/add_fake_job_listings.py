from django.core.management.base import BaseCommand
from faker import Faker
import random

from backend.models import JobListing, Company


class Command(BaseCommand):
    help = "Generate fake company"

    def handle(self, *args, **kwargs):
        faker = Faker()
        job_requirements = [
            "Proven ability to lead and manage teams in a fast-paced environment",
            "Strong verbal and written communication skills",
            "Ability to think critically and solve complex problems",
            "Experience with project management tools (Jira, Trello, Asana, etc.)",
            "Must be detail-oriented and organized",
            "Ability to work independently with minimal supervision",
            "Proficient in Microsoft Office Suite (Word, Excel, PowerPoint, etc.)",
            "Strong negotiation and conflict resolution skills",
            "Experience in managing cross-functional teams",
            "Comfortable working in a remote or hybrid work environment",
            "Excellent time management and multitasking abilities",
            "Demonstrated success in managing budgets and financial planning",
            "Ability to adapt to changing business environments and priorities",
            "Fluent in both English and Spanish (or other languages as needed)",
            "Experience with data analysis and reporting tools",
            "Ability to prioritize tasks and meet deadlines in a fast-paced environment",
            "Strong customer service orientation with a passion for helping others",
            "Experience with customer relationship management (CRM) software",
            "Bachelor's degree or equivalent experience in a relevant field",
            "Experience working in an Agile or Scrum development environment"
        ]
        work_type = [
            'Remote',
            'Onsite',
            'Hybrid'
        ]
        working_styles = ['Collaborative', 'Independent']
        for _ in range(10000):
            random_company = Company.objects.order_by('?').first()
            job_listing = JobListing.objects.create(
                company=random_company,
                title=faker.job(),
                description=faker.text(),
                requirements=random.sample(job_requirements, 3),
                location=faker.city(),
                work_type=random.choice(work_type),
                posted_date=faker.date_between(start_date='-1y', end_date='now'),
                salary=round(faker.random_number(digits=5) + faker.random_number(digits=2) / 100, 2),
                working_style=random.choice(working_styles)
            )
            job_listing.save()

        self.stdout.write(self.style.SUCCESS("Successfully added fake data"))