import { gql } from '@apollo/client'

export const LOGIN_USER = gql`
  mutation LoginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      success
      user {
        username
        id
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
    $workLifeBalance: Int
    $flexibility: Int
    $mentalHealth: Int
  ) {
    registerCompany(
      name: $name
      password: $password
      values: $values
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
  $skills: [String]
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
    skills: $skills
  ) {
    success
    user {
      username
    }
  }
}
`;

export const CREATE_COMPANY_REVIEW = gql`
  mutation CreateCompanyReview(
    $companyName: String!
    $review: String!
    $stars: Int!
  ) {
    createCompanyReview(
      companyName: $companyName
      review: $review
      stars: $stars
    ) {
      success
      companyReview {
        review
        stars
      }  
    }
  }
`

export const CREATE_JOB_LISTING = gql`
  mutation CreateJobListing(
    $companyName: String!
    $title: String!
    $description: String!
    $requirements: [String]
    $location: String
    $workType: String!
    $salary: Int
    $workingStyle: String
  ) {
    createJobListing(
      companyName: $companyName
      title: $title
      description: $description
      requirements: $requirements
      location: $location
      workType: $workType
      salary: $salary
      workingStyle: $workingStyle
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
        workingStyle
      }
    }
  }
`;

export const CREATE_REQUEST = gql`
  mutation CreateRequest($userId: ID!, $jobListingId: ID!) {
    createRequest(userId: $userId, jobListingId: $jobListingId) {
      success
      message
    }
  }
`;