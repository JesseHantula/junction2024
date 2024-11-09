import graphene
import json

USERS_FILE = "users.json"
COMPANIES_FILE = "companies.json"


def load_data(file_name):
    try:
        with open(file_name, "r") as f:
            return json.load(f)
    except FileNotFoundError:
        return []


def save_data(file_name, data):
    with open(file_name, "w") as f:
        json.dump(data, f)


class UserType(graphene.ObjectType):
    username = graphene.String()
    password = graphene.String()
    gender = graphene.String()
    race = graphene.String()
    values = graphene.List(graphene.String)
    working_style = graphene.String()


class CompanyType(graphene.ObjectType):
    name = graphene.String()
    password = graphene.String()
    values = graphene.List(graphene.String)
    preferences = graphene.List(graphene.String)
    working_habits = graphene.List(graphene.String)


class RegisterUser(graphene.Mutation):
    class Arguments:
        username = graphene.String(required=True)
        password = graphene.String(required=True)
        birthday = graphene.Date()
        gender = graphene.String(required=True)
        race = graphene.String(required=True)
        values = graphene.List(graphene.String)
        working_style = graphene.String()

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
        values=None,
        working_style=None,
    ):
        users = load_data(USERS_FILE)
        for user in users:
            if user["username"] == username:
                return RegisterUser(success=False, user=None)  # Username already exists
        new_user = {
            "username": username,
            "password": password,
            "birthday": birthday,
            "gender": gender,
            "race": race,
            "values": values or [],
            "working_style": working_style
        }
        users.append(new_user)
        save_data(USERS_FILE, users)
        return RegisterUser(success=True, user=UserType(**new_user))


class LoginUser(graphene.Mutation):
    class Arguments:
        username = graphene.String(required=True)
        password = graphene.String(required=True)

    success = graphene.Boolean()
    user = graphene.Field(UserType)

    def mutate(self, info, username, password):
        users = load_data(USERS_FILE)
        for user in users:
            if user["username"] == username and user["password"] == password:
                return LoginUser(success=True, user=UserType(**user))
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
        companies = load_data(COMPANIES_FILE)
        for company in companies:
            if company["name"] == name:
                return RegisterCompany(
                    success=False, company=None
                )  # Company name already exists
        new_company = {
            "name": name,
            "password": password,
            "values": values or [],
            "preferences": preferences or [],
            "working_habits": working_habits or [],
        }
        companies.append(new_company)
        save_data(COMPANIES_FILE, companies)
        return RegisterCompany(success=True, company=CompanyType(**new_company))


class LoginCompany(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)
        password = graphene.String(required=True)

    success = graphene.Boolean()
    company = graphene.Field(CompanyType)

    def mutate(self, info, name, password):
        companies = load_data(COMPANIES_FILE)
        for company in companies:
            if company["name"] == name and company["password"] == password:
                return LoginCompany(success=True, company=CompanyType(**company))
        return LoginCompany(success=False, company=None)


# backend/schema.py (continued)


class MatchType(graphene.ObjectType):
    user = graphene.Field(UserType)
    company = graphene.Field(CompanyType)
    score = graphene.Int()


class Query(graphene.ObjectType):
    match = graphene.List(MatchType)

    def resolve_match(self, info):
        users = load_data(USERS_FILE)
        companies = load_data(COMPANIES_FILE)
        matches = []
        for user in users:
            for company in companies:
                score = len(set(user["values"]) & set(company["values"]))
                score += len(set(user["preferences"]) & set(company["preferences"]))
                score += len(
                    set(user["working_habits"]) & set(company["working_habits"])
                )
                if score > 0:
                    matches.append(
                        MatchType(
                            user=UserType(**user),
                            company=CompanyType(**company),
                            score=score,
                        )
                    )
        return matches


# backend/schema.py (continued)


class Mutation(graphene.ObjectType):
    register_user = RegisterUser.Field()
    login_user = LoginUser.Field()
    register_company = RegisterCompany.Field()
    login_company = LoginCompany.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
