import { IUnitOfWork } from "../../infraestructure/contracts/i.unit.of.work";
import { BankAccount } from "../../domain/entity/bank.account";
import { Transaction } from "../../domain/entity/transaction";

export class ConsingCurrentAccountService{
  constructor(private readonly unitOfWork: IUnitOfWork) {}

  async execute(request: ConsingCurrentAccountRequest): Promise<ConsingCurrentAccountResponse>{
    try{
      const accountSearched: BankAccount = await this.unitOfWork.currentaccountRepository.findEntity(request.number);

      if (accountSearched == undefined){
        return  new ConsingCurrentAccountResponse('esta cuenta bancaria a la que quiere consignar no se encuentra registrada');
      }
      const balance: number = accountSearched.balance;
      const newTransaction: Transaction= new Transaction();
      newTransaction.value = request.value;
      accountSearched.consing(newTransaction);

      if (accountSearched.balance== balance){
        return  new ConsingCurrentAccountResponse('consignacion no realizada. valor de la transferencia incorrecto');
      }else {
        await this.unitOfWork.start();
        await this.unitOfWork.currentaccountRepository.save(accountSearched);
        return  new ConsingCurrentAccountResponse('consignacion exitosa');
      }


    }catch(e){
      return new ConsingCurrentAccountResponse('se ha presentado un error al momento de consignar en esta cuenta bancaria');
    }
  }
}


export class ConsingCurrentAccountRequest{
  constructor (
    public readonly number: string,
    public readonly value: number

  ){}
}


export class ConsingCurrentAccountResponse{
  constructor(public readonly message: string) {}
}