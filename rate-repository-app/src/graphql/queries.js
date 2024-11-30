import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          id
          description
          forksCount
          fullName
          language
          ownerAvatarUrl
          ratingAverage
          reviewCount
          stargazersCount
        }
      }
    }
  }
`;

export const GET_ONE = gql`
  query GetOne($id: ID!) {
    repository(id: $id) {
      description
      forksCount
      fullName
      language
      ownerAvatarUrl
      ratingAverage
      reviewCount
      stargazersCount
      url
    }
  }
`

export const GET_ME = gql`
  query {
    me {
      id
      username
    }
  }
`;