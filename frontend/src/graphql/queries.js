import { gql } from "@apollo/client";

export const GET_USER = gql`
  query GetUser($username: String!) {
    user(username: $username) {
      id
      username
      birthday
      gender
      race
      values
      workingStyle
      workLifeBalance
      flexibility
      mentalHealth
      skills
    }
  }
`;

export const GET_COMPANY = gql`
  query GetCompany($name: String!) {
    company(name: $name) {
      id
      name
      values
      workLifeBalance
      flexibility
      mentalHealth
      jobListings {
        title
        description
        location
        workType
        salary
        postedDate
      }
    }
  }
`;

export const GET_JOB_LISTING = gql`
  query GetJobListing($id: Int!) {
    jobListing(id: $id) {
      id
      title
      description
      requirements
      location
      workType
      postedDate
      salary
      company {
        name
        workLifeBalance
        flexibility
        mentalHealth
      }
    }
  }
`;

export const GET_ALL_JOB_LISTINGS = gql`
  query GetAllJobListings {
    jobListings {
      id
      title
      description
      requirements
      location
      workType
      postedDate
      salary
      company {
        name
        workLifeBalance
        flexibility
        mentalHealth
      }
    }
  }
`;

export const GET_JOB_LISTINGS_BY_COMPANY = gql`
  query GetJobListingsByCompany($companyName: String!) {
    jobListingsByCompany(companyName: $companyName) {
      id
      title
      description
      requirements
      location
      workType
      postedDate
      salary
    }
  }
`;

export const GET_ALL_USERS = gql`
  query GetAllUsers {
    users {
      id
      username
      birthday
      gender
      race
      values
      workingStyle
      workLifeBalance
      flexibility
      mentalHealth
    }
  }
`;

export const GET_ALL_COMPANIES = gql`
  query GetAllCompanies {
    companies {
      id
      name
      values
      preferences
      workingHabits
      workLifeBalance
      flexibility
      mentalHealth
      jobListings {
        title
        location
      }
    }
  }
`;

export const GET_ALL_COMPANY_NAMES = gql`
  query GetAllCompanies {
    companies {
      id
      name
    }
  }
`;

export const GET_MATCHES = gql`
  query GetMatches($username: String, $companyName: String) {
  match(username: $username, companyName: $companyName) {
    user {
      id
      username
      values
      workLifeBalance
      flexibility
      mentalHealth
    }
    jobListing {
      id
      title
      description
      requirements
      location
      workType
      salary
      company {
        id
        name
        values
        workLifeBalance
        flexibility
        mentalHealth
      }
    }
    score
  }
}
`;

export const GET_REQUEST_BY_COMPANY = gql`
  query GetRequestByCompany($companyId: Int!) {
    requestsByCompany(companyId: $companyId) {
      id
      user {
        username
        id
      }
      jobListing {
        title
      }
      status
      createdAt
    }
  }
`;

export const GET_COMPANY_REVIEWS_AVG_SCORE = gql`
  query GetCompanyReviewsAvgScore($companyName: String!) {
    companyReviewsAvgScore(companyName: $companyName)
  }
`;

