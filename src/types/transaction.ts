import { CurrencyEnum, TransactionType } from "./enums";
import { Account } from "./account";
import { Category } from "./category";

export interface Transaction {
  id: number;

  amount: number;

  currency: CurrencyEnum;

  type: TransactionType;

  date: Date;

  description?: string;

  accountId: number;

  account?: Pick<Account, "id" | "name">;

  categoryId: number;

  category?: Pick<Category, "id" | "name">;

  linkedTransactionId?: number;

  createdAt: Date;

  updatedAt: Date;
}
