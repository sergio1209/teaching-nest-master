import { Injectable } from "@nestjs/common";
import { EntityRepository } from "typeorm";
import { GenericRepository } from "../base/generic.repository";
import { SavingAccountOrm } from "../database/orm/saving.account.orm";


@Injectable()
@EntityRepository(SavingAccountOrm)
export class savingaccountRepository extends GenericRepository<SavingAccountOrm>{}