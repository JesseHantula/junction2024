from django.core.management.base import BaseCommand
from faker import Faker
import random
from backend.models import User


class Command(BaseCommand):
    help = "Generate fake users"

    def handle(self, *args, **kwargs):
        faker = Faker()
        genders = ["Male", "Female", "Other"]
        gender_weights = [0.475, 0.475, 0.05]
        working_styles = ["Collaborative", "Independent"]
        values = [
            "Honesty",
            "Integrity",
            "Teamwork",
            "Innovation",
            "Excellence",
            "Respect",
            "Accountability",
            "Passion",
            "Courage",
            "Empathy",
        ]
        races = [
            "Asian",
            "Black or African American",
            "Hispanic or Latino",
            "White",
            "Native American",
        ]
        skills_list = [
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

        for _ in range(10000):
            username = f"{faker.user_name()}_{random.randint(1000, 999999)}"
            user = User.objects.create(
                username=username,
                password=faker.password(),
                birthday=faker.date_between(start_date="-40y", end_date="-20y"),
                gender=random.choices(genders, weights=gender_weights, k=1)[0],
                race=random.choice(races),
                values=random.sample(values, 3),
                working_style=random.choice(working_styles),
                work_life_balance=random.randint(1, 10),
                flexibility=random.randint(1, 10),
                mental_health=random.randint(1, 10),
                skills=random.sample(
                    skills_list, random.randint(4, 8)
                ),  # Add 4-8 random skills
            )
            user.save()

        self.stdout.write(self.style.SUCCESS("Successfully added fake data"))
