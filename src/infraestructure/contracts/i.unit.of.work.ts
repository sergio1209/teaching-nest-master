import { currentaccountRepository } from "../repositories/currentaccount.repository";
import { savingaccountRepository } from "../repositories/savingaccount.repository";
import { Connection } from "typeorm";

export interface IUnitOfWork{
  currentaccountRepository: currentaccountRepository;
  savingaccountRepository: savingaccountRepository;
  start(): void;
  complete(work: () => any): Promise<any>;
  getConnection(): Connection;
  closeConnection();
}