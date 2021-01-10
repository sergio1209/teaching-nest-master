import { IUnitOfWork } from "../../infraestructure/contracts/i.unit.of.work";
import { BankAccount } from "../../domain/entity/bank.account";
import { Transaction } from "../../domain/entity/transaction";

export class RemoveSavingAccountService {
  constructor(private readonly unitOfWork: IUnitOfWork) {}

  async execute(request: RemoveSavingAccountRequest): Promise<RemoveSavingAccountResponse>{
    try{
      const accountSearched: BankAccount = await this.unitOfWork.savingaccountRepository.findEntity(request.number);

      if (accountSearched == undefined){
        return  new RemoveSavingAccountResponse('esta cuenta bancaria a la que quiere retirar no se encuentra registrada');
      }
      const balance: number = accountSearched.balance;
      const newTransaction: Transaction= new Transaction();
      newTransaction.value = request.value;
      accountSearched.remove(newTransaction);

      if (accountSearched.balance== balance){
        return  new RemoveSavingAccountResponse('retiro no realizado. valor del retiro incorrecto');
      }else {
        await this.unitOfWork.start();
        await this.unitOfWork.savingaccountRepository.save(accountSearched);
        return  new RemoveSavingAccountResponse('retiro exitoso');
      }


    }catch(e){
      return new RemoveSavingAccountResponse('se ha presentado un error al momento de retirar en esta cuenta bancaria');
    }
  }
}


export class RemoveSavingAccountRequest {
  constructor (
    public readonly number: string,
    public readonly value: number,

  ){}
}


export class RemoveSavingAccountResponse {
  constructor(public readonly message: string) {}
}