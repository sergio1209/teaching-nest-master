import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";
import { FinancialMovement } from "../../../domain/entity/financial.movement";


@Entity( 'SAVING_ACCOUNTS')
export class SavingAccountOrm{
  @ObjectIdColumn()
  _id: ObjectID;
  @Column()
  public  number: string;
  @Column()
  public balance: number;
  @Column()
  public  ownerId: string;
  @Column()
  public city: string;
  @Column()
  public movements: FinancialMovement[];

}
