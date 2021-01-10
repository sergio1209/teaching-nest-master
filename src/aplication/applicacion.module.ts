import { RegisterCurrentAccountService } from "./current-account/register.current.account.service";
import { Module } from "@nestjs/common";
import { RegisterSavingAccountService } from "./saving-account/register.saving.account.service";
import { ConsingCurrentAccountService } from "./current-account/consing.current.account.service";
import { ConsingSavingAccountService } from "./saving-account/consing.saving.account.service";
import { RemoveCurrentAccountService } from "./current-account/remove.current.account.service";
import { RemoveSavingAccountService } from "./saving-account/remove.saving.account.service";

@Module({
  imports: [
    RegisterCurrentAccountService,
    RegisterSavingAccountService,
    ConsingCurrentAccountService,
    ConsingSavingAccountService,
    RemoveCurrentAccountService,
    RemoveSavingAccountService
  ],
  exports: [
    RegisterCurrentAccountService,
    RegisterSavingAccountService,
    ConsingCurrentAccountService,
    ConsingSavingAccountService,
    RemoveCurrentAccountService,
    RemoveSavingAccountService
  ]
})
export class ApplicationModule{}