import { CategoryType } from "./enums";

export interface Category {
  id: number;

  name: string;

  type: CategoryType;

  userId: number;

  isActive: boolean;
}
