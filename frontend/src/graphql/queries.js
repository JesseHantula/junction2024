import { gql } from "@apollo/client";

export const GET_USER = gql`
  query GetUser($username: String!) {
    user(username: $username) {
      username
      birthday
      gender
      race
      values
      workingStyle
    }
  }
`;

export const GET_COMPANY = gql`
  query GetCompany($name: String!) {
    company(name: $name) {
      name
      values
      preferences
      workingHabits
      jobListings {
        title
        description
        location
        workType
        salary
      }
    }
  }
`;

export const GET_JOB_LISTING = gql`
  query GetJobListing($id: Int!) {
    jobListing(id: $id) {
      title
      description
      requirements
      location
      workType
      postedDate
      salary
      company {
        name
      }
    }
  }
`;

export const GET_ALL_JOB_LISTINGS = gql`
  query GetAllJobListings {
    jobListings {
      title
      description
      requirements
      location
      workType
      postedDate
      salary
      company {
        name
      }
    }
  }
`;

export const GET_JOB_LISTINGS_BY_COMPANY = gql`
  query GetJobListingsByCompany($companyName: String!) {
    jobListingsByCompany(companyName: $companyName) {
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
      username
      birthday
      gender
      race
      values
      workingStyle
    }
  }
`;

export const GET_ALL_COMPANIES = gql`
  query GetAllCompanies {
    companies {
      name
      values
      preferences
      workingHabits
      jobListings {
        title
        location
      }
    }
  }
`;

export const GET_MATCHES = gql`
  query GetMatches {
    match {
      user {
        username
        values
      }
      company {
        name
        values
      }
      score
    }
  }
`;
