import { BankAccount } from "./bank.account";

import { Transaction } from "./transaction";
import { FinancialMovement } from "./financial.movement";

export class cuentaCorriente extends BankAccount{

  //variables
 private readonly  cupo_Sobregiro: number=-20000;
  private readonly  minimo_PrimeraConsignacion:number=100000;





//consignacion
  public consing(transaction) {
    if(this.validateFirstMovements() && transaction.value >= this.minimo_PrimeraConsignacion){
      super.consing(transaction);
    }else if(!this.validateFirstMovements() && transaction.value > 0){
      super.consing(transaction);
    }
  }

  //retiro
  public remove(transaction){
    let newBalance: number = this.balance - this.CuatroPorMil(transaction.value);
    if(newBalance >= this.cupo_Sobregiro){
      this.balance -= transaction.value;
      let newMovement = new FinancialMovement();
      newMovement.type = 'Retiro';
      newMovement.date = new Date();
      newMovement.value = transaction.value;
      this.movements.push(newMovement);
    }
  }
//validacion
  validateFirstMovements(){
    return this.movements.length == 0;
  }
//metodo cuatro por mil


CuatroPorMil(value: number){

    return value - ((value * 4)/1000);

  }

//transferencia
  public transfer(){

  }
}