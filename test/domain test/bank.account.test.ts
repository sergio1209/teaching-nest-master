import { BankAccount } from "../../src/domain/entity/bank.account";
import { SavingAccount } from "../../src/domain/entity/saving.account";
import { Transaction } from "../../src/domain/entity/transaction";
import { cuentaCorriente } from "../../src/domain/entity/cuentaCorriente";

describe('test account bank',() => {
  let bankAccount : BankAccount;

describe('SAving Account', () => {
  beforeAll( () =>{
    bankAccount = new SavingAccount();
    bankAccount.number='0000';
    bankAccount.city='valledupar';
    bankAccount.ownerId='1065';
    bankAccount.balance= 0;
  });

  test('consign negative or zero', () =>{

    const newTransaction: Transaction= new Transaction();
    newTransaction.city='valledupar';
    newTransaction.value=-50000;
    bankAccount.consing(newTransaction);
    expect(bankAccount.balance).toBe(0);

  });

});


  describe('Current Account', () => {
    beforeAll( () =>{
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

  });

});