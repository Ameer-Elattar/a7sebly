import { gql } from "@apollo/client";

export const GET_CATEGORIES_QUERY = gql`
  query GetCategories {
    categories {
      id
      name
      type
      userId
      isActive
    }
  }
`;

export const GET_CATEGORY_QUERY = gql`
  query GetCategory($id: ID!) {
    getCategory(id: $id) {
      id
      name
      type
      userId
      isActive
    }
  }
`;
