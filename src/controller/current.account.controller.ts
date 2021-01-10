import { Body, Controller, Post } from "@nestjs/common";
import { UnitOfWork } from "../infraestructure/base/unit.of.work";
import {
  RegisterCurrentAccountRequest,
  RegisterCurrentAccountService
} from "../aplication/current-account/register.current.account.service";

@Controller('currentAcoount')
export class CurrentAccountController{

  constructor(private readonly unitOfWork: UnitOfWork) {
  }
  @Post()
  async registerCurrentAccount(@Body() request: RegisterCurrentAccountRequest){
    const service: RegisterCurrentAccountService = new RegisterCurrentAccountService(this.unitOfWork);
    return await service.execute(request);
  }
}