import { AccountType, CurrencyEnum } from "./enums";
import { Transaction } from "./transaction";

export interface Account {
  id: number;

  name: string;

  type: AccountType;

  balance: number;

  currency: CurrencyEnum;

  notes?: string;

  userId: number;

  transactions?: Transaction[];

  createdDate: Date;

  updatedDate: Date;
}
