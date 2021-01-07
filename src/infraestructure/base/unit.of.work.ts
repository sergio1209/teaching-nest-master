import { IUnitOfWork } from "../contracts/i.unit.of.work";
import { currentaccountRepository } from "../repositories/currentaccount.repository";
import { savingaccountRepository } from "../repositories/savingaccount.repository";
import { Connection, EntityManager, QueryRunner } from "typeorm";
import { Inject } from "@nestjs/common";

export class UnitOfWork implements IUnitOfWork{
  private readonly queryRunner: QueryRunner;
  private transactionManager: EntityManager;

  currentaccountRepository: currentaccountRepository;
  savingaccountRepository: savingaccountRepository;

  constructor(@Inject('DATABASE_CONNECTION') private readonly  asyncDatabaseConnection: Connection) {
    this.queryRunner = this.asyncDatabaseConnection.createQueryRunner();

    this.currentaccountRepository = this.asyncDatabaseConnection.getCustomRepository(currentaccountRepository);
    this.savingaccountRepository = this.asyncDatabaseConnection.getCustomRepository(savingaccountRepository);
  }
  async start() {
    await this.queryRunner.startTransaction();
    this.setTransactionManager();
  }
  private setTransactionManager(){
    this.transactionManager = this.queryRunner.manager;
  }


  async complete(work: () => any): Promise<any> {
    try{
      const response = await work();
      await this.queryRunner.commitTransaction();
      return response;
    }catch (e){
      await this.queryRunner.rollbackTransaction();
      return e.toString();
    }finally {
      await this.queryRunner.release();
    }
  }

  getConnection(): Connection {
    return this.asyncDatabaseConnection;
  }

  async  closeConnection() {
    await this.asyncDatabaseConnection.close();
    await this.queryRunner.manager.connection.close();
  }

}