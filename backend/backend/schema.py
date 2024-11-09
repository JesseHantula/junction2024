# schema.py

import random
import graphene
from .models import User, Company, JobListing, Request
from .types import UserType, CompanyType, JobListingType, MatchType, RequestType
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
    requests = graphene.List(RequestType)
    requests_by_company = graphene.List(RequestType, company_id=graphene.Int(required=True))


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

        # Define weights for different compatibility factors, including skills match
        WEIGHTS = {
            "values_match": 0.3,
            "work_life_balance": 0.2,
            "flexibility": 0.2,
            "mental_health": 0.1,
            "working_style": 0.1,
            "skills_match": 0.1,  # New weight for skills match
        }

        def calculate_compatibility_score(user, job_listing):
            score = 0
            company = job_listing.company

            # Values match (overlap of user and company values)
            shared_values = set(user.values) & set(company.values)
            values_score = len(shared_values) / len(user.values) if user.values else 0
            score += values_score * WEIGHTS["values_match"]

            # Work-life balance compatibility
            balance_diff = abs(user.work_life_balance - company.work_life_balance)
            balance_score = max(0, 1 - balance_diff / 10)
            score += balance_score * WEIGHTS["work_life_balance"]

            # Flexibility compatibility
            flexibility_diff = abs(user.flexibility - company.flexibility)
            flexibility_score = max(0, 1 - flexibility_diff / 10)
            score += flexibility_score * WEIGHTS["flexibility"]

            # Mental health compatibility
            mental_health_diff = abs(user.mental_health - company.mental_health)
            mental_health_score = max(0, 1 - mental_health_diff / 10)
            score += mental_health_score * WEIGHTS["mental_health"]

            # Working style compatibility
            working_style_score = (
                1 if user.working_style == job_listing.working_style else 0
            )
            score += working_style_score * WEIGHTS["working_style"]

            # Skills match (overlap of user skills and job listing requirements)
            matched_skills = set(user.skills) & set(job_listing.requirements)
            skills_score = (
                len(matched_skills) / len(job_listing.requirements)
                if job_listing.requirements
                else 0
            )
            score += skills_score * WEIGHTS["skills_match"]

            # Scale to 0-100
            return int(score * 100)

        # If a username is provided, find matches for the user with all job listings
        if username:
            try:
                user = User.objects.get(username=username)
                job_listings = JobListing.objects.select_related("company")
                job_listings = random.sample(list(job_listings), 2000)
                if company_name:
                    job_listings = job_listings.filter(company__name=company_name)

                for job_listing in job_listings:
                    score = calculate_compatibility_score(user, job_listing)
                    matches.append(
                        MatchType(
                            user=user,
                            job_listing=job_listing,
                            score=score,
                        )
                    )
            except User.DoesNotExist:
                return []

        # If a company name is provided without a username, match all users with that company's job listings
        elif company_name:
            try:
                company = Company.objects.get(name=company_name)
                job_listings = JobListing.objects.filter(company=company)
                users = User.objects.all()
                users = random.sample(list(users), 500)

                for job_listing in job_listings:
                    for user in users:
                        score = calculate_compatibility_score(user, job_listing)
                        matches.append(
                            MatchType(
                                user=user,
                                job_listing=job_listing,
                                score=score,
                            )
                        )
            except Company.DoesNotExist:
                return []

        # Sort matches by score in descending order
        matches.sort(key=lambda x: x.score, reverse=True)
        return matches
    
    def resolve_requests(self, info):
        return Request.objects.all()
    
    def resolve_requests_by_company(self, info, company_id):
        try:
            company = Company.objects.get(id=company_id)
            job_listings = JobListing.objects.filter(company=company)
            return Request.objects.filter(job_listing__in=job_listings)
        except Company.DoesNotExist:
            return []


schema = graphene.Schema(query=Query, mutation=Mutation)
