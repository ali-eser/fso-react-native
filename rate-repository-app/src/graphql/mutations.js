import { gql } from "@apollo/client";

export const AUTHENTICATION = gql`
  mutation Mutation($username: String!, $password: String!) {
    authenticate(credentials: { username: $username, password: $password }) {
      accessToken
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation CreateReview($ownerName: String!, $repositoryName: String!, $rating: Int!, $text: String) {
    createReview(review: {
      ownerName: $ownerName,
      repositoryName: $repositoryName,
      rating: $rating,
      text: $text
    }) {
      repositoryId
    }
  }
`;

export const DELETE_REVIEW = gql`
  mutation DeleteReview($deleteReviewId: ID!) {
    deleteReview(id: $deleteReviewId)
  }
`

export const CREATE_USER = gql`
  mutation Mutation($user: CreateUserInput) {
    createUser(user: $user) {
      createdAt
      id
      username
    }
  }
`;