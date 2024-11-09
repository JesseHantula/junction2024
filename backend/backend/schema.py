# schema.py

import random
import graphene
from .models import User, Company, JobListing
from .types import UserType, CompanyType, JobListingType, MatchType
from .mutations import Mutation


class Query(graphene.ObjectType):
    user = graphene.Field(UserType, username=graphene.String(required=True))
    company = graphene.Field(CompanyType, name=graphene.String(required=True))
    job_listing = graphene.Field(JobListingType, id=graphene.Int(required=True))
    job_listings = graphene.List(JobListingType)
    job_listings_by_company = graphene.List(
        JobListingType, company_name=graphene.String(required=True)
    )
    users = graphene.List(UserType)
    companies = graphene.List(CompanyType)
    match = graphene.List(
        MatchType, username=graphene.String(), company_name=graphene.String()
    )

    # Resolve a single user by username
    def resolve_user(self, info, username):
        try:
            return User.objects.get(username=username)
        except User.DoesNotExist:
            return None

    # Resolve a single company by name
    def resolve_company(self, info, name):
        try:
            return Company.objects.get(name=name)
        except Company.DoesNotExist:
            return None

    # Resolve a single job listing by ID
    def resolve_job_listing(self, info, id):
        try:
            return JobListing.objects.get(id=id)
        except JobListing.DoesNotExist:
            return None

    # Resolve all job listings
    def resolve_job_listings(self, info):
        return JobListing.objects.all()

    # Resolve job listings by a specific company
    def resolve_job_listings_by_company(self, info, company_name):
        try:
            company = Company.objects.get(name=company_name)
            return JobListing.objects.filter(company=company)
        except Company.DoesNotExist:
            return []

    # Resolve all users
    def resolve_users(self, info):
        return User.objects.all()

    # Resolve all companies
    def resolve_companies(self, info):
        return Company.objects.all()

    # Matching logic between users and companies
    def resolve_match(self, info, username=None, company_name=None):
        matches = []
        if username:
            try:
                user = User.objects.get(username=username)
                companies = Company.objects.all()
                for company in companies:
                    score = random.randint(1, 100)
                    matches.append(
                        MatchType(
                            user=user,
                            company=company,
                            score=score,
                        )
                    )
            except User.DoesNotExist:
                return []
        elif company_name:
            try:
                company = Company.objects.get(name=company_name)
                users = User.objects.all()
                for user in users:
                    score = random.randint(1, 100)
                    matches.append(
                        MatchType(
                            user=user,
                            company=company,
                            score=score,
                        )
                    )
            except Company.DoesNotExist:
                return []
        return matches


schema = graphene.Schema(query=Query, mutation=Mutation)
