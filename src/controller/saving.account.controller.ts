import { Body, Controller, Post } from "@nestjs/common";
import { UnitOfWork } from "../infraestructure/base/unit.of.work";
import {
  RegisterSavingAccountRequest,
  RegisterSavingAccountService
} from "../aplication/saving-account/register.saving.account.service";
import {
  RemoveSavingAccountRequest,
  RemoveSavingAccountService
} from "../aplication/saving-account/remove.saving.account.service";
import {
  ConsingSavingAccountRequest,
  ConsingSavingAccountService
} from "../aplication/saving-account/consing.saving.account.service";



@Controller('savingAccount')
export class SavingAccountController{

  constructor(private readonly unitOfWork: UnitOfWork) {
  }
  @Post()
  async RegisterSavingAccount(@Body() request: RegisterSavingAccountRequest){
    const service: RegisterSavingAccountService = new RegisterSavingAccountService(this.unitOfWork);
    return await service.execute(request);
  }
  @Post()
  async ConsingSavingAccount(@Body() request: ConsingSavingAccountRequest){
    const service: ConsingSavingAccountService = new ConsingSavingAccountService(this.unitOfWork);
    return await service.execute(request);
  }
  @Post()
  async RemoveSavingAccount(@Body() request: RemoveSavingAccountRequest){
    const service: RemoveSavingAccountService = new RemoveSavingAccountService(this.unitOfWork);
    return await service.execute(request);
  }

}