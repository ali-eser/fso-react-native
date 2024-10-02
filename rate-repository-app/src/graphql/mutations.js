import { gql } from "@apollo/client";

export const AUTHENTICATION = gql`
  mutation {
    authenticate(credentials: { username: ${username}, password: ${password} }) {
      accessToken
    }
  }
`;