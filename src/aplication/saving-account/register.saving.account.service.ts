import { IUnitOfWork } from "../../infraestructure/contracts/i.unit.of.work";
import { BankAccount } from "../../domain/entity/bank.account";
import { Transaction } from "../../domain/entity/transaction";
import { SavingAccount } from "../../domain/entity/saving.account";
import { currentaccountRepository } from "../../infraestructure/repositories/currentaccount.repository";
import { savingaccountRepository } from "../../infraestructure/repositories/savingaccount.repository";

export class RegisterSavingAccountService{
  constructor(private readonly unitOfWork: IUnitOfWork) {}

  async execute(request: RegisterSavingAccountRequest): Promise<RegisterSavingAccountResponse>{
    try{
      const accountSearched: BankAccount = await this.unitOfWork.savingaccountRepository.findEntity(request.number);

      if (accountSearched == undefined){
        const newAccount: BankAccount = new SavingAccount();
        newAccount.number = request.number;
        newAccount.ownerId = request.ownerId;
        newAccount.city= request.city;
        const firstTransaction:  Transaction =  new Transaction();
        firstTransaction.value= parseInt(request.firstConsingValue.toString());
        firstTransaction.city= request.transactionCity;
        newAccount.consing(firstTransaction);

        if (newAccount.balance > 0){
          this.unitOfWork.start();
          const savedAccount = await this.unitOfWork.savingaccountRepository.save(savingaccountRepository.mapEntityToOrm(newAccount) );
          if (savedAccount != undefined){
            return new RegisterSavingAccountResponse('Cuenta de ahorros numero' + savedAccount.number + 'ha sido creada satisfactoriamente');
          }


        }
        return new RegisterSavingAccountResponse('consignacion inicial insuficiente, la consignacion minima inicial debe ser $50.000 COP');
      }

      return  new RegisterSavingAccountResponse('esta cuenta bancaria ya se encuentra registrada');

    }catch(e){
      return new RegisterSavingAccountResponse('se ha presentado un error al momento de registrar esta cuenta bancaria');
    }
  }

}

export class RegisterSavingAccountRequest{
  constructor (
    public readonly number: string,
    public readonly ownerId: string,
    public readonly  city: string,
    public readonly transactionCity: string,
    public readonly  firstConsingValue: number
  ){}

}

export class RegisterSavingAccountResponse{
  constructor(public readonly message: string) {
  }
}