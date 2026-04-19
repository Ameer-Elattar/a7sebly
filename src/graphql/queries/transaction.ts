import { gql } from "@apollo/client";

export const GET_TRANSACTIONS_QUERY = gql`
  query GetTransactions {
    transactions {
      id
      amount
      type
      currency
      date
      description
      category {
        id
        name
      }
      account {
        id
        name
      }
      createdAt
      updatedAt
    }
  }
`;
