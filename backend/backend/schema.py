import graphene
from .models import User, Company, JobListing
from graphene_django.types import DjangoObjectType


class UserType(graphene.ObjectType):
    username = graphene.String()
    password = graphene.String()
    birthday = graphene.Date()
    gender = graphene.String()
    race = graphene.String()
    values = graphene.List(graphene.String)
    working_style = graphene.String()
    work_life_balance = graphene.Int()
    flexibility = graphene.Int()
    mental_health = graphene.Int()


class JobListingType(graphene.ObjectType):
    title = graphene.String()
    description = graphene.String()
    requirements = graphene.List(graphene.String)
    location = graphene.String()
    work_type = graphene.String()
    posted_date = graphene.Date()
    salary = graphene.Float()


class CompanyType(graphene.ObjectType):
    name = graphene.String()
    password = graphene.String()
    values = graphene.List(graphene.String)
    preferences = graphene.List(graphene.String)
    working_habits = graphene.List(graphene.String)
    job_listings = graphene.List(JobListingType)


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

    success = graphene.Boolean()
    company = graphene.Field(CompanyType)

    def mutate(
        self, info, name, password, values=None, preferences=None, working_habits=None
    ):
        if Company.objects.filter(name=name).exists():
            return RegisterCompany(success=False, company=None)

        company = Company.objects.create(
            name=name,
            password=password,
            values=values or [],
            preferences=preferences or [],
            working_habits=working_habits or [],
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
        )


class CompanyType(DjangoObjectType):
    class Meta:
        model = Company
        fields = (
            "name",
            "password",
            "values",
            "preferences",
            "working_habits",
            "job_listings",
        )


class MatchType(graphene.ObjectType):
    user = graphene.Field(UserType)
    company = graphene.Field(CompanyType)
    score = graphene.Int()


class Query(graphene.ObjectType):
    # New Queries
    user = graphene.Field(UserType, username=graphene.String(required=True))
    company = graphene.Field(CompanyType, name=graphene.String(required=True))
    job_listing = graphene.Field(JobListingType, id=graphene.Int(required=True))
    job_listings = graphene.List(JobListingType)
    job_listings_by_company = graphene.List(
        JobListingType, company_name=graphene.String(required=True)
    )
    users = graphene.List(UserType)
    companies = graphene.List(CompanyType)
    match = graphene.List(MatchType)

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
    def resolve_match(self, info):
        users = User.objects.all()
        companies = Company.objects.all()
        matches = []
        for user in users:
            for company in companies:
                score = len(set(user.values) & set(company.values))
                if score > 0:
                    matches.append(
                        MatchType(
                            user=UserType(username=user.username),
                            company=CompanyType(name=company.name),
                            score=score,
                        )
                    )
        return matches


class Mutation(graphene.ObjectType):
    register_user = RegisterUser.Field()
    login_user = LoginUser.Field()
    register_company = RegisterCompany.Field()
    login_company = LoginCompany.Field()
    create_job_listing = CreateJobListing.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
