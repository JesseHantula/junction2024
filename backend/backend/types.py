# types.py

import graphene
from graphene_django.types import DjangoObjectType
from .models import User, Company, JobListing


class WorkTypeChoicesEnum(graphene.Enum):
    REMOTE = "Remote"
    REMOTE_LOWER = "remote"
    ONSITE = "Onsite"
    ONSITE_LOWER = "onsite"
    HYBRID = "Hybrid"
    HYBRID_LOWER = "hybrid"

    @staticmethod
    def from_string(value):
        # Standardize the value to match Enum cases
        value = value.lower()
        if value == "remote":
            return WorkTypeChoicesEnum.REMOTE
        elif value == "onsite":
            return WorkTypeChoicesEnum.ONSITE
        elif value == "hybrid":
            return WorkTypeChoicesEnum.HYBRID
        raise ValueError(f"Unknown work type: {value}")


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = (
            "id",  # Add id field
            "username",
            "password",
            "birthday",
            "gender",
            "race",
            "values",
            "working_style",
            "work_life_balance",
            "flexibility",
            "mental_health",
            "skills",
        )


class JobListingType(DjangoObjectType):
    work_type = graphene.Field(WorkTypeChoicesEnum)  # Update work_type to use the Enum

    class Meta:
        model = JobListing
        fields = (
            "id",  # Add id field
            "title",
            "description",
            "requirements",
            "location",
            "work_type",
            "posted_date",
            "salary",
            "company",
        )


class CompanyType(DjangoObjectType):
    class Meta:
        model = Company
        fields = (
            "id",  # Add id field
            "name",
            "password",
            "values",
            "job_listings",
            "work_life_balance",
            "flexibility",
            "mental_health",
        )


class MatchType(graphene.ObjectType):
    user = graphene.Field(UserType)
    job_listing = graphene.Field(JobListingType)
    score = graphene.Int()
