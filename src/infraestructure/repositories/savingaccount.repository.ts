import { Injectable } from "@nestjs/common";
import { EntityRepository } from "typeorm";
import { GenericRepository } from "../base/generic.repository";
import { SavingAccountOrm } from "../database/orm/saving.account.orm";
import { BankAccount } from "../../domain/entity/bank.account";
import { SavingAccount } from "../../domain/entity/saving.account";


@Injectable()
@EntityRepository(SavingAccountOrm)
export class savingaccountRepository extends GenericRepository<SavingAccountOrm>{
  public mapOrmToEntity(Orm: SavingAccount): BankAccount{
    const account: BankAccount = new SavingAccount();
    account._id= Orm._id;
    account.number= Orm.number;
    account.ownerId=Orm.ownerId;
    account.city= Orm.city;
    account.balance= Orm.balance == undefined ? 0 : Orm.balance;
    account.movements = Orm.movements;
    return account;
  }
}