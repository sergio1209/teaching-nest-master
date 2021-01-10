import { IUnitOfWork } from "../../infraestructure/contracts/i.unit.of.work";
import { BankAccount } from "../../domain/entity/bank.account";
import { Transaction } from "../../domain/entity/transaction";


export class ConsingSavingAccountService{
  constructor(private readonly unitOfWork: IUnitOfWork) {}

  async execute(request: ConsingSavingAccountRequest): Promise<ConsingSavingAccountResponse>{
    try{
      const accountSearched: BankAccount = await this.unitOfWork.savingaccountRepository.findEntity(request.number);

      if (accountSearched == undefined){
        return  new ConsingSavingAccountResponse('esta cuenta bancaria a la que quiere consignar no se encuentra registrada');
      }
      const balance: number = accountSearched.balance;
      const newTransaction: Transaction= new Transaction();
      newTransaction.city= request.city;
      newTransaction.value = request.value;
      accountSearched.consing(newTransaction);

      if (accountSearched.balance== balance){
        return  new ConsingSavingAccountResponse('consignacion no realizada. valor de la transferencia incorrecto');
      }else {
        await this.unitOfWork.start();
        await this.unitOfWork.savingaccountRepository.save(accountSearched);
        return  new ConsingSavingAccountResponse('consignacion exitosa');
      }


    }catch(e){
      return new ConsingSavingAccountResponse('se ha presentado un error al momento de consignar en esta cuenta bancaria');
    }
  }
}


export class ConsingSavingAccountRequest{
  constructor (
    public readonly number: string,
    public readonly ownerId: string,
    public readonly  city: string,
    public readonly value: number,
    public readonly  firstConsingValue: number
  ){}
}


export class ConsingSavingAccountResponse{
  constructor(public readonly message: string) {}
}