import { EntityRepository } from "typeorm";
import { CuentaCorrienteOrm } from "../database/orm/CuentaCorriente.orm";
import { Injectable } from "@nestjs/common";
import { GenericRepository } from "../base/generic.repository";

@Injectable()
@EntityRepository(CuentaCorrienteOrm)
export class currentaccountRepository extends GenericRepository<CuentaCorrienteOrm>{}