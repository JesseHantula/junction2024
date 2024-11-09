# types.py

import graphene
from graphene_django.types import DjangoObjectType
from .models import User, Company, JobListing


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = (
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
        )


class JobListingType(DjangoObjectType):
    class Meta:
        model = JobListing
        fields = (
            "title",
            "description",
            "requirements",
            "location",
            "work_type",
            "posted_date",
            "salary",
            "company",
            "working_style"
        )


class CompanyType(DjangoObjectType):
    class Meta:
        model = Company
        fields = (
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
    company = graphene.Field(CompanyType)
    score = graphene.Int()
