import { Account } from "./account";
import { Category } from "./category";
import { Transaction } from "./transaction";

export interface User {
  id: number;

  username: string;

  email: string;

  accounts?: Account[];

  transactions?: Transaction[];

  categories?: Category[];
}
