import { BankAccount } from "../../src/domain/entity/bank.account";
import { SavingAccount } from "../../src/domain/entity/saving.account";
import { Transaction } from "../../src/domain/entity/transaction";
import { cuentaCorriente } from "../../src/domain/entity/cuentaCorriente";

describe('test account bank',() => {
  let bankAccount : BankAccount;

  describe('Savings account', ()=>{

    beforeEach(() => {
      bankAccount = new SavingAccount();
      bankAccount.number = '0000';
      bankAccount.city = 'Valledupar';
      bankAccount.ownerId = '1065';
      bankAccount.balance = 0;
    });

    test('Consign negative or zero', () => {
      const newTransaction: Transaction = new Transaction();
      newTransaction.city = 'Valledupar';
      newTransaction.value = -50000;
      bankAccount.consing(newTransaction);
      expect(bankAccount.balance).toBe(0);
    });

    test('Correct consign', () => {
      const newTransaction: Transaction = new Transaction();
      newTransaction.city = 'Valledupar';
      newTransaction.value = 50000;
      bankAccount.consing(newTransaction);
      expect(bankAccount.balance).toBe(50000);
    });

    test('Wrong consign', () => {
      const new_Transaction: Transaction = new Transaction();
      new_Transaction.city = 'Valledupar';
      new_Transaction.value = 49950;
      bankAccount.consing(new_Transaction);
      expect(bankAccount.balance).toBe(0);
    });

    test('Consignación posterior a la inicial correcta', () => {

      const newTransaccion: Transaction = new Transaction();
      newTransaccion.city = "Valledupar";
      newTransaccion.value = 50000;
      bankAccount.consing(newTransaccion);
      newTransaccion.city = "Valledupar";
      newTransaccion.value = 20000;
      bankAccount.remove(newTransaccion);
      newTransaccion.city = "Valledupar";
      newTransaccion.value = 49950;
      bankAccount.consing(newTransaccion);
      expect(bankAccount.balance).toBe(79950);
    });

    test('Consignación posterior a la inicial correcta con diferente ciudad', () => {

      const newTransaccion: Transaction = new Transaction();
      newTransaccion.city = "Valledupar";
      newTransaccion.value = 50000;
      bankAccount.consing(newTransaccion);
      newTransaccion.city = "Valledupar";
      newTransaccion.value = 20000;
      bankAccount.remove(newTransaccion);
      newTransaccion.city = "Bogota";
      newTransaccion.value = 49950;
      bankAccount.consing(newTransaccion);
      expect(bankAccount.balance).toBe(69950);
    });



  });


  describe('Current Account', () => {
    beforeEach( () =>{
      bankAccount = new cuentaCorriente();
      bankAccount.number='0000';
      bankAccount.city='valledupar';
      bankAccount.ownerId='1066';
      bankAccount.balance= 0;
    });
    test('consign negative or zero', () =>{

      const newTransaction: Transaction= new Transaction();
      newTransaction.city='valledupar';
      newTransaction.value=-50000;
      bankAccount.consing(newTransaction);
      expect(bankAccount.balance).toBe(0);

    });


    test('Consignación Inicial Correcta', () => {
      const newTransaccion: Transaction = new Transaction();
      newTransaccion.city = "Valledupar";
      newTransaccion.value = 60000;
      bankAccount.consing(newTransaccion);
      expect(bankAccount.balance).toBe(0);
    });

    test('Consignación Inicial Incorrecta', () => {
      const newTransaccion: Transaction = new Transaction();
      newTransaccion.city = "Valledupar";
      newTransaccion.value = 20000;
      bankAccount.consing(newTransaccion);
      expect(bankAccount.balance).toBe(0);
    });

    test('Next consign correct', () => {

      const new_Transaction: Transaction = new Transaction();
      new_Transaction.city = 'Valledupar';
      new_Transaction.value = 500000;
      bankAccount.consing(new_Transaction);
      new_Transaction.city = 'Valledupar';
      new_Transaction.value = 200000;
      bankAccount.remove(new_Transaction);
      new_Transaction.city = 'Valledupar';
      new_Transaction.value = 499950;
      bankAccount.consing(new_Transaction);
      expect(bankAccount.balance).toBe(799950);
    });

    test('Next consign correct, different city', () => {

      const new_Transaction: Transaction = new Transaction();
      new_Transaction.city = 'Valledupar';
      new_Transaction.value = 500000;
      bankAccount.consing(new_Transaction);
      new_Transaction.city = 'Valledupar';
      new_Transaction.value = 200000;
      bankAccount.remove(new_Transaction);
      new_Transaction.city = 'Bogota';
      new_Transaction.value = 499950;
      bankAccount.consing(new_Transaction);
      expect(bankAccount.balance).toBe(799950);
    });





  });


});