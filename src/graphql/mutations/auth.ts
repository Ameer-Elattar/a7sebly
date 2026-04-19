import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation Login($LoginInput: LoginInput!) {
    login(loginInput: $LoginInput) {
      accessToken
      refreshToken
    }
  }
`;
