from django.core.management.base import BaseCommand
from faker import Faker
import random

from backend.models import JobListing, Company


class Command(BaseCommand):
    help = "Generate fake company"

    def handle(self, *args, **kwargs):
        faker = Faker()
        job_requirements = [
            "Agile Methodology",
            "Adaptability",
            "AutoCAD",
            "AWS (Amazon Web Services)",
            "Blockchain Technology",
            "Business Intelligence (BI)",
            "C++",
            "Cloud Computing",
            "Communication Skills",
            "Conflicts Resolution",
            "Creativity",
            "Critical Thinking",
            "Customer Service",
            "Data Analysis",
            "Data Visualization",
            "Decision Making",
            "Docker",
            "Digital Marketing",
            "Excel (Advanced)",
            "Emotional Intelligence",
            "Git/GitHub",
            "Google Cloud Platform (GCP)",
            "HTML/CSS",
            "Illustrator",
            "Java",
            "JavaScript",
            "Jira",
            "Leadership",
            "Machine Learning",
            "Mobile App Development (React Native, iOS, Android)",
            "Negotiation Skills",
            "Node.js",
            "Photoshop",
            "Power BI",
            "Problem-Solving",
            "Project Management Tools (Jira, Trello)",
            "Python",
            "React.js",
            "Ruby on Rails",
            "SQL",
            "SEO (Search Engine Optimization)",
            "Tableau",
            "Teamwork",
            "Time Management",
            "UI/UX Design",
            "Web Development",
            "WordPress",
        ]
        work_type = ["Remote", "Onsite", "Hybrid"]
        working_styles = ["Collaborative", "Independent"]
        for _ in range(10000):
            random_company = Company.objects.order_by("?").first()
            job_listing = JobListing.objects.create(
                company=random_company,
                title=faker.job(),
                description=faker.text(),
                requirements=random.sample(job_requirements, random.randint(4, 8)),
                location=faker.city(),
                work_type=random.choice(work_type),
                posted_date=faker.date_between(start_date="-1y", end_date="now"),
                salary=int(
                    round(
                        faker.random_number(digits=5)
                        + faker.random_number(digits=2) / 100,
                        2,
                    )
                ),
                working_style=random.choice(working_styles),
            )
            job_listing.save()

        self.stdout.write(self.style.SUCCESS("Successfully added fake data"))
