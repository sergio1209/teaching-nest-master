import { IFinancialService } from "../contracts/financial.services.interface";
import { Transaction } from "./transaction";
import { FinancialMovement } from "./financial.movement";
import { ObjectID } from "typeorm";

export abstract class BankAccount implements IFinancialService{
  public _id: ObjectID;
  public number: string;
  public balance: number;
  public ownerId: string;
  public city: string;
  public movements: FinancialMovement[];

  constructor() {
    this.movements  = []
    this.balance = 0;
  }
  public consing(transaction: Transaction){
    let nuevoMovimiento= new FinancialMovement();
    nuevoMovimiento.type= 'consignacion';
    nuevoMovimiento.date= new Date();
    nuevoMovimiento.value= transaction.value;
    this.balance += transaction.value;
    this.movements.push(nuevoMovimiento);

  }

  public abstract remove(transaction: Transaction);



  public transfer(transaction: Transaction, account: IFinancialService){
   this.remove(transaction);
   account.consing(transaction);
  }

}