import { gql } from "@apollo/client";

export const GET_ACCOUNTS_QUERY = gql`
  query GetAccounts {
    accounts {
      id
      name
      balance
      currency
      notes
      type
      createdDate
      updatedDate
    }
  }
`;
export const GET_ACCOUNT_QUERY = gql`
  query GetAccount($id: Int!) {
    account(id: $id) {
      id
      name
      balance
      currency
      notes
      type
      createdDate
      updatedDate
    }
  }
`;
