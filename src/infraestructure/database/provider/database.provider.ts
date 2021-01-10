import { createConnection } from "typeorm";


export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () => await createConnection({
      type: 'mongodb',
      url: 'mongodb+srv://root:root@cluster0.1odkf.mongodb.net/financial_services?retryWrites=true&w=majority',
      logging: true,
      synchronize: true,
      useNewUrlParser: true,
      ssl: true,
      entities: ['dist/infraestructure/database/orm/*.js']
    })
  }
]