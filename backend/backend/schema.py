import graphene
from .models import User, Company

class UserType(graphene.ObjectType):
    username = graphene.String()
    password = graphene.String()
    birthday = graphene.Date()
    gender = graphene.String()
    race = graphene.String()
    values = graphene.List(graphene.String)
    working_style = graphene.String()

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

    success = graphene.Boolean()
    user = graphene.Field(UserType)

    def mutate(self, info, username, password, birthday, gender, race, values=None, working_style=None):
        if User.objects.filter(username=username).exists():
            return RegisterUser(success=False, user=None)

        user = User.objects.create(
            username=username,
            password=password,
            birthday=birthday,
            gender=gender,
            race=race,
            values=values or [],
            working_style=working_style
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

    def mutate(self, info, name, password, values=None, preferences=None, working_habits=None):
        if Company.objects.filter(name=name).exists():
            return RegisterCompany(success=False, company=None)

        company = Company.objects.create(
            name=name,
            password=password,
            values=values or [],
            preferences=preferences or [],
            working_habits=working_habits or []
        )

        return RegisterCompany(success=True, company=CompanyType(name=company.name))


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


class MatchType(graphene.ObjectType):
    user = graphene.Field(UserType)
    company = graphene.Field(CompanyType)
    score = graphene.Int()


class Query(graphene.ObjectType):
    match = graphene.List(MatchType)

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