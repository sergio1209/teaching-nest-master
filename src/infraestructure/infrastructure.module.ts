import { Module } from "@nestjs/common";
import { DatabaseModule } from "./database/database.module";
import { UnitOfWork } from "./base/unit.of.work";

@Module({
  imports: [DatabaseModule],
  providers: [UnitOfWork],
  exports: [UnitOfWork]
})
export class InfrastructureModule{}
