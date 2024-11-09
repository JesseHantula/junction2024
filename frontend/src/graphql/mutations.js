import { gql } from '@apollo/client'

export const LOGIN_USER = gql`
  mutation LoginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      success
      user {
        username
      }
    }
  }
`;

export const LOGIN_COMPANY = gql`
  mutation LoginCompany($name: String!, $password: String!) {
    loginCompany(name: $name, password: $password) {
      success
      company {
        name
      }
    }
  }
`;

export const REGISTER_COMPANY = gql`
  mutation RegisterCompany(
    $name: String!
    $password: String!
    $values: [String]
    $preferences: [String]
    $workingHabits: [String]
    $workLifeBalance: Int
    $flexibility: Int
    $mentalHealth: Int
  ) {
    registerCompany(
      name: $name
      password: $password
      values: $values
      preferences: $preferences
      workingHabits: $workingHabits
      workLifeBalance: $workLifeBalance
      flexibility: $flexibility
      mentalHealth: $mentalHealth
    ) {
      success
      company {
        name
      }
    }
  }
`;

export const REGISTER_USER = gql`
mutation RegisterUser(
  $username: String!
  $password: String!
  $birthday: Date!
  $gender: String!
  $race: String!
  $values: [String]
  $workingStyle: String
  $workLifeBalance: Int
  $flexibility: Int
  $mentalHealth: Int
) {
  registerUser(
    username: $username
    password: $password
    birthday: $birthday
    gender: $gender
    race: $race
    values: $values
    workingStyle: $workingStyle
    workLifeBalance: $workLifeBalance
    flexibility: $flexibility
    mentalHealth: $mentalHealth
  ) {
    success
    user {
      username
    }
  }
}
`;

export const CREATE_JOB_LISTING = gql`
  mutation CreateJobListing(
    $companyName: String!
    $title: String!
    $description: String!
    $requirements: [String]
    $location: String
    $workType: String
    $salary: Float
  ) {
    createJobListing(
      companyName: $companyName
      title: $title
      description: $description
      requirements: $requirements
      location: $location
      workType: $workType
      salary: $salary
    ) {
      success
      jobListing {
        title
        description
        requirements
        location
        workType
        postedDate
        salary
      }
    }
  }
`;