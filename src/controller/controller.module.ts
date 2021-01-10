import { InfrastructureModule } from "../infraestructure/infrastructure.module";
import { ApplicationModule } from "../aplication/applicacion.module";
import { CurrentAccountController } from "./current.account.controller";
import { SavingAccountController } from "./saving.account.controller";
import { Module } from "@nestjs/common";

@Module({
  imports: [
    InfrastructureModule,
    ApplicationModule
  ],
  controllers: [
    CurrentAccountController,
    SavingAccountController
  ]

})
export  class ControllerModule{}