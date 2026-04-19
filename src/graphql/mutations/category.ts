import { gql } from "@apollo/client";

export const CREATE_CATEGORY = gql`
  mutation CreateCategory($category: CreateCategoryInput!) {
    createCategory(category: $category) {
      id
      name
      type
      userId
      isActive
    }
  }
`;

export const UPDATE_CATEGORY = gql`
  mutation UpdateCategory($id: ID!, $category: UpdateCategoryInput!) {
    updateCategory(id: $id, category: $category) {
      id
      name
      type
      userId
      isActive
    }
  }
`;

export const DELETE_CATEGORY = gql`
  mutation DeleteCategory($id: ID!) {
    deleteCategory: delete(id: $id)
  }
`;

export const ACTIVATE_CATEGORY = gql`
  mutation ActivateCategory($id: ID!) {
    activateCategory: activate(id: $id)
  }
`;

export const DEACTIVATE_CATEGORY = gql`
  mutation DeactivateCategory($id: ID!) {
    deactivateCategory: deactive(id: $id)
  }
`;
