import { gql } from "@apollo/client";

export const GET_MATCHES = gql`
    query GetMatches {
        match {
            user {
            username
            }
            company {
            name
            }
            score
        }
    }
`;