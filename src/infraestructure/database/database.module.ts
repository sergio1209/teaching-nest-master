import { databaseProviders } from "./provider/database.provider";
import { currentAccountProvider, savingAccountProvider } from "./migrations/entities.provider";
import { Module } from "@nestjs/common";

@Module({
  providers: [
    ...databaseProviders,
    ...currentAccountProvider,
    ...savingAccountProvider

  ],
  exports: [
    ...databaseProviders,
    ...currentAccountProvider,
    ...savingAccountProvider
  ]
})
export class DatabaseModule{}