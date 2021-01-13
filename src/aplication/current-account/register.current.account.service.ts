import { IUnitOfWork } from "../../infraestructure/contracts/i.unit.of.work";
import { cuentaCorriente } from "../../domain/entity/cuentaCorriente";
import { BankAccount } from "../../domain/entity/bank.account";
import { Transaction } from "../../domain/entity/transaction";
import { currentaccountRepository } from "../../infraestructure/repositories/currentaccount.repository";


export class RegisterCurrentAccountService{
  constructor(private readonly unitOfWork: IUnitOfWork) {}

  async execute(request: RegisterCurrentAccountRequest): Promise<RegisterCurrentAccountResponse>{
    try{
      const accountSearched: BankAccount = await this.unitOfWork.currentaccountRepository.findEntity(request.number);

      if (accountSearched == undefined){
        const newAccount: BankAccount = new cuentaCorriente();
        newAccount.number = request.number;
        newAccount.ownerId = request.ownerId;
        newAccount.city= request.city;
        const firstTransaction:  Transaction =  new Transaction();
        firstTransaction.value= parseInt(request.firstConsingValue.toString());
        firstTransaction.city = request.city;
        newAccount.consing(firstTransaction);

        if (newAccount.balance > 0){
          this.unitOfWork.start();
          const savedAccount = await this.unitOfWork.currentaccountRepository.save(currentaccountRepository.mapEntityToOrm(newAccount) );
          if (savedAccount != undefined){
            return new RegisterCurrentAccountResponse('Cuenta corriente numero' + savedAccount.number + 'ha sido creada satisfactoriamente');
          }


        }
        return new RegisterCurrentAccountResponse('consignacion inicial insuficiente, la consignacion minima inicial debe ser $100.000 COP');
      }

      return  new RegisterCurrentAccountResponse('esta cuenta bancaria ya se encuentra registrada');

    }catch(e){
      return new RegisterCurrentAccountResponse('se ha presentado un error al momento de registrar esta cuenta bancaria');
      }
    }

}

export class RegisterCurrentAccountRequest{
  constructor (
    public readonly number: string,
    public readonly ownerId: string,
    public readonly  city: string,
    public readonly  firstConsingValue: number
  ){}

}

export class RegisterCurrentAccountResponse{
  constructor(public readonly message: string) {
  }
}