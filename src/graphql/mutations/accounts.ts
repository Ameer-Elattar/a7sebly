import { gql } from "@apollo/client";

export const CREATE_ACCOUNT = gql`
  mutation createAccount($createAccountInput: CreateAccountInput!) {
    createAccount(createAccountInput: $createAccountInput) {
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
export const UPDATE_ACCOUNT = gql`
  mutation updateAccount($id: Int!, $updateAccountInput: UpdateAccountInput!) {
    updateAccount(id: $id, updateAccountInput: $updateAccountInput) {
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
