import { Injectable } from "@nestjs/common";
import { MongoRepository } from "typeorm";
import { BankAccount } from "../../domain/entity/bank.account";

@Injectable()
export abstract class GenericRepository<T> extends MongoRepository<T> {
  public abstract mapOrmToEntity(orm: T): BankAccount;

  public async findEntity(number: string): Promise<BankAccount>{
    const orm = await this.findOne({where:{number: number}});
    return orm == undefined ? undefined: this.mapOrmToEntity(orm);
  }

  public async findAllEntity(): Promise<BankAccount[]>{
    const accounts: BankAccount[] = [];
    const searchedUsers = await this.find();
    searchedUsers.forEach(orm => accounts.push(this.mapOrmToEntity(orm)));
    return accounts;
  }

}
