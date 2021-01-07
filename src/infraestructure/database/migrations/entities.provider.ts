import { Connection } from "typeorm";
import { CuentaCorrienteOrm } from "../orm/CuentaCorriente.orm";
import { SavingAccountOrm } from "../orm/saving.account.orm";




export const currentAccountProvider = [
  {
    provide: 'CURRENT_ACCOUNT_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(CuentaCorrienteOrm),
    inject: ['DATABASE_CONNECTION'],
  }
];

export const savingAccountProvider = [
  {
    provide: 'SAVING_ACCOUNT_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(SavingAccountOrm),
    inject: ['DATABASE_CONNECTION'],
  }
];