import { Body, Controller, Post } from "@nestjs/common";
import { UnitOfWork } from "../infraestructure/base/unit.of.work";
import {
  RegisterSavingAccountRequest,
  RegisterSavingAccountService
} from "../aplication/current-account/register.saving.account.service";

@Controller('savingAcoount')
export class SavingAccountController{

  constructor(private readonly unitOfWork: UnitOfWork) {
  }
  @Post()
  async registerSavingAccount(@Body() request: RegisterSavingAccountRequest){
    const service: RegisterSavingAccountService = new RegisterSavingAccountService(this.unitOfWork);
    return await service.execute(request);
  }
}