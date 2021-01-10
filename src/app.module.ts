import { Module } from '@nestjs/common';
import { ApplicationModule } from "./aplication/applicacion.module";
import { ControllerModule } from "./controller/controller.module";
import { InfrastructureModule } from "./infraestructure/infrastructure.module";

@Module({
  imports: [

    ApplicationModule,
    ControllerModule,
    InfrastructureModule
  ],

})
export class AppModule {}
