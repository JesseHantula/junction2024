# mutations.py

import graphene
import random
from .models import User, Company, JobListing
from .types import UserType, CompanyType, JobListingType


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
            user = User.objects.get(username=username, password=password)
            return LoginUser(success=True, user=UserType(username=user.username))
        except User.DoesNotExist:
            return LoginUser(success=False, user=None)


class RegisterCompany(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)
        password = graphene.String(required=True)
        values = graphene.List(graphene.String)
        preferences = graphene.List(graphene.String)
        working_habits = graphene.List(graphene.String)
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
        preferences=None,
        working_habits=None,
    ):

        if Company.objects.filter(name=name).exists():
            return RegisterCompany(success=False, company=None)

        company = Company.objects.create(
            name=name,
            password=password,
            values=values or [],
            preferences=preferences or [],
            working_habits=working_habits or [],
            work_life_balance=work_life_balance,
            flexibility=flexibility,
            mental_health=mental_health,
        )

        return RegisterCompany(success=True, company=CompanyType(name=company.name))


class CreateJobListing(graphene.Mutation):
    class Arguments:
        company_name = graphene.String(required=True)
        title = graphene.String(required=True)
        description = graphene.String(required=True)
        requirements = graphene.List(graphene.String)
        location = graphene.String()
        work_type = graphene.String()
        salary = graphene.Float()

    success = graphene.Boolean()
    job_listing = graphene.Field(JobListingType)

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
    ):
        try:
            company = Company.objects.get(name=company_name)
            job_listing = JobListing.objects.create(
                company=company,
                title=title,
                description=description,
                requirements=requirements or [],
                location=location,
                work_type=work_type,
                salary=salary,
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
                ),
            )
        except Company.DoesNotExist:
            return CreateJobListing(success=False, job_listing=None)


class LoginCompany(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)
        password = graphene.String(required=True)

    success = graphene.Boolean()
    company = graphene.Field(CompanyType)

    def mutate(self, info, name, password):
        try:
            company = Company.objects.get(name=name, password=password)
            return LoginCompany(success=True, company=CompanyType(name=company.name))
        except Company.DoesNotExist:
            return LoginCompany(success=False, company=None)


class Mutation(graphene.ObjectType):
    register_user = RegisterUser.Field()
    login_user = LoginUser.Field()
    register_company = RegisterCompany.Field()
    login_company = LoginCompany.Field()
    create_job_listing = CreateJobListing.Field()
