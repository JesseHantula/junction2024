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
  ) {
    registerCompany(
      name: $name
      password: $password
      values: $values
      preferences: $preferences
      workingHabits: $workingHabits
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
) {
  registerUser(
    username: $username
    password: $password
    birthday: $birthday
    gender: $gender
    race: $race
    values: $values
    workingStyle: $workingStyle
  ) {
    success
    user {
      username
    }
  }
}
`;