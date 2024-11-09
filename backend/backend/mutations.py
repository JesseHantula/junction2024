# mutations.py

import graphene
import random
from .models import User, Company, JobListing, Request, CompanyReview
from .types import (
    UserType,
    CompanyType,
    JobListingType,
    WorkTypeChoicesEnum,
    RequestType,
    CompanyReviewType,
)


class RegisterUser(graphene.Mutation):
    class Arguments:
        username = graphene.String(required=True)
        password = graphene.String(required=True)
        birthday = graphene.Date(required=True)
        gender = graphene.String(required=True)
        race = graphene.String(required=True)
        values = graphene.List(graphene.String)
        working_style = graphene.String()
        work_life_balance = graphene.Int()
        flexibility = graphene.Int()
        mental_health = graphene.Int()
        skills = graphene.List(graphene.String)

    success = graphene.Boolean()
    user = graphene.Field(UserType)

    def mutate(
        self,
        info,
        username,
        password,
        birthday,
        gender,
        race,
        work_life_balance,
        flexibility,
        mental_health,
        skills,
        values=None,
        working_style=None,
    ):
        if User.objects.filter(username=username).exists():
            return RegisterUser(success=False, user=None)

        user = User.objects.create(
            username=username,
            password=password,
            birthday=birthday,
            gender=gender,
            race=race,
            values=values or [],
            working_style=working_style,
            work_life_balance=work_life_balance,
            flexibility=flexibility,
            mental_health=mental_health,
            skills=skills,
        )

        return RegisterUser(success=True, user=UserType(username=user.username))


class LoginUser(graphene.Mutation):
    class Arguments:
        username = graphene.String(required=True)
        password = graphene.String(required=True)

    success = graphene.Boolean()
    user = graphene.Field(UserType)

    def mutate(self, info, username, password):
        try:
            user2 = User.objects.get(username=username, password=password)
            return LoginUser(success=True, user=user2)
        except User.DoesNotExist:
            return LoginUser(success=False, user=None)


class RegisterCompany(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)
        password = graphene.String(required=True)
        values = graphene.List(graphene.String)
        work_life_balance = graphene.Int()
        flexibility = graphene.Int()
        mental_health = graphene.Int()

    success = graphene.Boolean()
    company = graphene.Field(CompanyType)

    def mutate(
        self,
        info,
        name,
        password,
        work_life_balance,
        flexibility,
        mental_health,
        values=None,
    ):

        if Company.objects.filter(name=name).exists():
            return RegisterCompany(success=False, company=None)

        company = Company.objects.create(
            name=name,
            password=password,
            values=values or [],
            work_life_balance=work_life_balance,
            flexibility=flexibility,
            mental_health=mental_health,
        )

        return RegisterCompany(success=True, company=CompanyType(name=company.name))


class CreateCompanyReview(graphene.Mutation):
    class Arguments:
        company_name = graphene.String(required=True)
        review = graphene.String(required=True)
        stars = graphene.Int(required=True)

    success = graphene.Boolean()
    company_review = graphene.Field(CompanyReviewType)
    errors = graphene.List(graphene.String)

    def mutate(self, info, company_name, review, stars):
        try:
            company = Company.objects.get(name=company_name)
            company_review = CompanyReview.objects.create(
                company=company, review=review, stars=stars
            )
            return CreateCompanyReview(
                success=True,
                company_review=CompanyReviewType(
                    review=company_review.review, stars=company_review.stars
                ),
            )
        except Exception as e:
            es = [str(e)]
            return CreateCompanyReview(success=False, company_review=None, errors=es)


class CreateJobListing(graphene.Mutation):
    class Arguments:
        company_name = graphene.String(required=True)
        title = graphene.String(required=True)
        description = graphene.String(required=True)
        requirements = graphene.List(graphene.String)
        location = graphene.String()
        work_type = graphene.String(required=True)
        salary = graphene.Int()
        working_style = graphene.String()

    success = graphene.Boolean()
    job_listing = graphene.Field(JobListingType)
    errors = graphene.List(graphene.String)

    def mutate(
        self,
        info,
        company_name,
        title,
        description,
        requirements=None,
        location=None,
        work_type="onsite",
        salary=None,
        working_style=None,
    ):
        try:
            company = Company.objects.get(name=company_name)
            normalized_work_type = WorkTypeChoicesEnum.from_string(work_type).value
            job_listing = JobListing.objects.create(
                company=company,
                title=title,
                description=description,
                requirements=requirements or [],
                location=location,
                work_type=normalized_work_type,
                salary=salary,
                working_style=working_style,
            )
            return CreateJobListing(
                success=True,
                job_listing=JobListingType(
                    title=job_listing.title,
                    description=job_listing.description,
                    requirements=job_listing.requirements,
                    location=job_listing.location,
                    work_type=job_listing.work_type,
                    posted_date=job_listing.posted_date,
                    salary=job_listing.salary,
                    working_style=job_listing.working_style,
                ),
            )
        except Exception as e:
            # Catch any other unexpected errors during job creation
            es = [str(e)]
            return CreateJobListing(success=False, job_listing=None, errors=es)


class LoginCompany(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)
        password = graphene.String(required=True)

    success = graphene.Boolean()
    company = graphene.Field(CompanyType)

    def mutate(self, info, name, password):
        try:
            company2 = Company.objects.get(name=name, password=password)
            return LoginCompany(success=True, company=company2)
        except Company.DoesNotExist:
            return LoginCompany(success=False, company=None)


class CreateRequest(graphene.Mutation):
    class Arguments:
        user_id = graphene.ID(required=True)
        job_listing_id = graphene.ID(required=True)

    success = graphene.String()
    message = graphene.String()

    def mutate(self, info, user_id, job_listing_id):
        user = User.objects.get(id=user_id)
        job_listing = JobListing.objects.get(id=job_listing_id)

        # Check if a pending request already exists
        if Request.objects.filter(
            user=user, job_listing=job_listing, status="pending"
        ).exists():
            return CreateRequest(
                success="False", message="Similar pending request already exists"
            )

        # Create a new request
        request = Request.objects.create(user=user, job_listing=job_listing)

        return CreateRequest(success="True", message="Request successfully created.")


class Mutation(graphene.ObjectType):
    register_user = RegisterUser.Field()
    login_user = LoginUser.Field()
    register_company = RegisterCompany.Field()
    login_company = LoginCompany.Field()
    create_job_listing = CreateJobListing.Field()
    create_request = CreateRequest.Field()
    create_company_review = CreateCompanyReview.Field()
