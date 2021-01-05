import { BankAccount } from "./bank.account";

import { Transaction } from "./transaction";

export class cuentaCorriente extends BankAccount{

  //variables
  cupo_Sobregiro: number=-20000;
  minimo_PrimeraConsignacion:number=100000;
  cuatro_Mil: number;

  //validacion
  validateFirstMovements(){
    return this.movements.length == 0;
  }

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

let nuevoBalance: number = this.balance - this.CuatroPorMil(transaction.value);
    if(nuevoBalance >= this.cupo_Sobregiro){
      this.balance -= transaction.value;
    }
  }

//metodo cuatro por mil
  CuatroPorMil(transaction){
  this.cuatro_Mil= (transaction.value *4/1000);
    let minimal_Balance= transaction.value-this.cuatro_Mil;

    return minimal_Balance;
  }

//transferencia
  public transfer(){

  }
}