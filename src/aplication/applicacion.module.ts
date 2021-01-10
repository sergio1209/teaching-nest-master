import { RegisterCurrentAccountService } from "./current-account/register.current.account.service";
import { Module } from "@nestjs/common";
import { RegisterSavingAccountService } from "./current-account/register.saving.account.service";

@Module({
  imports: [
  RegisterCurrentAccountService,
  RegisterSavingAccountService
    ],
  exports: [
    RegisterCurrentAccountService,
    RegisterSavingAccountService
  ]
})
export class ApplicationModule{}