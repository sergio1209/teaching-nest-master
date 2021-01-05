import { BankAccount } from "./bank.account";

import { Transaction } from "./transaction";

export class SavingAccount extends BankAccount{





  public consing(transaction: Transaction) {
    this.validateDifferentCityDiscount(transaction);
    if(this.validateFirstMovements() && transaction.value >= 50000){
      super.consing(transaction);
    }else if(!this.validateFirstMovements() && transaction.value > 0){
      super.consing(transaction);
    }
  }

  public remove(transaction: Transaction) {
    if(this.validateRemoveByMonth())
      transaction.value += 5000;

    if(this.validateMinBalance(transaction.value))
      this.balance -= transaction.value;
  }

  validateFirstMovements(){
    return this.movements.length == 0;
  }

  validateDifferentCityDiscount(transaction:Transaction){
    if(transaction.city != this.city)
      transaction.value -= 10000;
  }

  validateMinBalance(value: number){
    let difference: number = this.balance - value;
    return difference >= 20000;
  }

  validateRemoveByMonth(){
    let counter: number = 0;
    if(this.movements.length < 3)
      return false;

    this.movements.forEach((movement) => {
      if(movement.date.getMonth() == new Date().getMonth() && movement.type == 'Retiro'){
        counter++;
      }
    });

    return counter >= 3;

  }

  transfer(transaction: Transaction) {}

}