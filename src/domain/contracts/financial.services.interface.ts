import { Transaction } from "../entity/transaction";

export interface IFinancialService{

  consing(transaction: Transaction);
  transfer(transaction: Transaction, account: IFinancialService);
  remove(transaction: Transaction);

}