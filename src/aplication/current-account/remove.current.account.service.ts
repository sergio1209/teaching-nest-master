import { IUnitOfWork } from "../../infraestructure/contracts/i.unit.of.work";
import { BankAccount } from "../../domain/entity/bank.account";
import { Transaction } from "../../domain/entity/transaction";

export class RemoveCurrentAccountService {
  constructor(private readonly unitOfWork: IUnitOfWork) {}

  async execute(request: RemoveCurrentAccountRequest): Promise<RemoveCurrentAccountResponse>{
    try{
      const accountSearched: BankAccount = await this.unitOfWork.currentaccountRepository.findEntity(request.number);

      if (accountSearched == undefined){
        return  new RemoveCurrentAccountResponse('esta cuenta bancaria a la que quiere retirar no se encuentra registrada');
      }
      const balance: number = accountSearched.balance;
      const newTransaction: Transaction= new Transaction();
      newTransaction.value = request.value;
      accountSearched.remove(newTransaction);

      if (accountSearched.balance== balance){
        return  new RemoveCurrentAccountResponse('retiro no realizado. valor del retiro incorrecto');
      }else {
        await this.unitOfWork.start();
        await this.unitOfWork.currentaccountRepository.save(accountSearched);
        return  new RemoveCurrentAccountResponse('retiro exitoso');
      }


    }catch(e){
      return new RemoveCurrentAccountResponse('se ha presentado un error al momento de retirar en esta cuenta bancaria');
    }
  }
}


export class RemoveCurrentAccountRequest {
  constructor (
    public readonly number: string,
    public readonly value: number

  ){}
}


export class RemoveCurrentAccountResponse {
  constructor(public readonly message: string) {}
}