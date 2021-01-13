import { Body, Controller, Post, Put } from "@nestjs/common";
import { UnitOfWork } from "../infraestructure/base/unit.of.work";
import {
  RegisterCurrentAccountRequest,
  RegisterCurrentAccountService
} from "../aplication/current-account/register.current.account.service";
import {
  ConsingSavingAccountRequest,
  ConsingSavingAccountService
} from "../aplication/saving-account/consing.saving.account.service";
import {
  RemoveSavingAccountRequest,
  RemoveSavingAccountService
} from "../aplication/saving-account/remove.saving.account.service";
import {
  ConsingCurrentAccountRequest,
  ConsingCurrentAccountService
} from "../aplication/current-account/consing.current.account.service";
import {
  RemoveCurrentAccountRequest,
  RemoveCurrentAccountService
} from "../aplication/current-account/remove.current.account.service";

@Controller('currentAccount')
export class CurrentAccountController{

  constructor(private readonly unitOfWork: UnitOfWork) {
  }
  @Post()
  async registerCurrentAccount(@Body() request: RegisterCurrentAccountRequest){
    const service: RegisterCurrentAccountService = new RegisterCurrentAccountService(this.unitOfWork);
    return await service.execute(request);
  }
  @Put( 'consignar')
  async ConsingCurrentAccount(@Body() request: ConsingCurrentAccountRequest){
    const service: ConsingCurrentAccountService = new ConsingCurrentAccountService(this.unitOfWork);
    return await service.execute(request);
  }
  @Put('retirar')
  async RemoveCurrentAccount(@Body() request: RemoveCurrentAccountRequest){
    const service: RemoveCurrentAccountService = new RemoveCurrentAccountService(this.unitOfWork);
    return await service.execute(request);
  }
}