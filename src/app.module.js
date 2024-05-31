import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AplicativoController } from './domain/controllers/aplicativo.controller.js';
import { AssinaturaController } from './domain/controllers/assinatura.controller.js';
import { ClienteController } from './domain/controllers/cliente.controller.js';
import { ServicoCadastramento } from './domain/services/servicoCadastramento.service.js';
import { Aplicativo } from './infraestructure/aplicativo.entity.js';
import { Assinatura } from './infraestructure/assinatura.entity.js';
import { Cliente } from './infraestructure/cliente.entity.js';
import { AplicativoRepositoryORM } from './infraestructure/aplicativoORM.repository.js';
import { AssinaturaRepositoryORM } from './infraestructure/assinaturaORM.repository.js';
import { ClienteRepositoryORM } from './infraestructure/clienteORM.repository.js';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      synchronize: true,
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([Aplicativo, Assinatura, Cliente]),
  ],
  controllers: [AplicativoController, AssinaturaController, ClienteController],
  providers: [
    ServicoCadastramento,
    AplicativoRepositoryORM,
    AssinaturaRepositoryORM,
    ClienteRepositoryORM,
  ],
})
export class AppModule {}
