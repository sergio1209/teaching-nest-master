import { EntityRepository } from "typeorm";
import { CuentaCorrienteOrm } from "../database/orm/CuentaCorriente.orm";
import { Injectable } from "@nestjs/common";
import { GenericRepository } from "../base/generic.repository";
import { cuentaCorriente } from "../../domain/entity/cuentaCorriente";
import { BankAccount } from "../../domain/entity/bank.account";
import arrayContaining = jasmine.arrayContaining;

@Injectable()
@EntityRepository(CuentaCorrienteOrm)
export class currentaccountRepository extends GenericRepository<CuentaCorrienteOrm>{

  public mapOrmToEntity(Orm: CuentaCorrienteOrm): BankAccount{
    const account: BankAccount = new cuentaCorriente();
   account._id= Orm._id;
    account.number= Orm.number;
    account.ownerId=Orm.ownerId;
    account.city= Orm.city;
    account.balance= Orm.balance == undefined ? 0 : Orm.balance;
    account.movements = Orm.movements;
    return account;
  }
  public static mapEntityToOrm(entity: BankAccount): CuentaCorrienteOrm{
    const orm: CuentaCorrienteOrm = new cuentaCorriente();
    orm._id= entity._id;
    orm.number= entity.number;
    orm.ownerId=entity.ownerId;
    orm.city= entity.city;
    orm.balance= entity.balance == undefined ? 0 : entity.balance;
    orm.movements = entity.movements;
    return orm;
  }
}