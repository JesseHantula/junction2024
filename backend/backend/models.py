from django.db import models


class User(models.Model):
    username = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=255)
    birthday = models.DateField()
    gender = models.CharField(max_length=50)
    race = models.CharField(max_length=50)
    values = models.JSONField(default=list)
    working_style = models.CharField(max_length=50, null=True, blank=True)
    work_life_balance = models.IntegerField(default=5)
    flexibility = models.IntegerField(default=5)
    mental_health = models.IntegerField(default=5)
    skills = models.JSONField(default=list)

    def __str__(self):
        return self.username


class Company(models.Model):
    name = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=255)
    values = models.JSONField(default=list)
    work_life_balance = models.IntegerField(default=5)
    flexibility = models.IntegerField(default=5)
    mental_health = models.IntegerField(default=5)

    def __str__(self):
        return self.name

class CompanyReview(models.Model):
    company = models.ForeignKey(
        Company, on_delete=models.CASCADE, related_name="company_reviews"
    )
    review = models.TextField()
    stars = models.IntegerField(default=3)

class JobListing(models.Model):
    company = models.ForeignKey(
        Company, on_delete=models.CASCADE, related_name="job_listings"
    )
    title = models.CharField(max_length=100)
    description = models.TextField()
    requirements = models.JSONField(default=list)
    location = models.CharField(max_length=100, blank=True, null=True)
    work_type = models.CharField(
        max_length=50,
        choices=[("remote", "Remote"), ("onsite", "Onsite"), ("hybrid", "Hybrid")],
        default="onsite",
    )
    posted_date = models.DateField(auto_now_add=True)
    salary = models.IntegerField(null=True, blank=True)  # Changed to IntegerField
    working_style = models.CharField(max_length=50, null=True, blank=True)

    def __str__(self):
        return self.title
    
class Request(models.Model):
    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("accepted", "Accepted"),
        ("rejected", "Rejected"),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="requests")
    job_listing = models.ForeignKey(JobListing, on_delete=models.CASCADE, related_name="requests")
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default="pending")
    created_at = models.DateTimeField(auto_now_add=True)