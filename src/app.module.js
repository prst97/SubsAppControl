import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AplicativoController } from './domain/controllers/aplicativo.controller.js';
import { AssinaturaController } from './domain/controllers/assinatura.controller.js';
import { ClienteController } from './domain/controllers/cliente.controller.js';
import { PagamentoController } from './domain/controllers/pagamento.controller.js';
import { UsuarioController } from './domain/controllers/usuario.controller.js';
import { ServicoCadastramento } from './domain/services/servicoCadastramento.service.js';
import { Aplicativo } from './infraestructure/aplicativo.entity.js';
import { Assinatura } from './infraestructure/assinatura.entity.js';
import { Cliente } from './infraestructure/cliente.entity.js';
import { Pagamento } from './infraestructure/pagamento.entity.js';
import { Usuario } from './infraestructure/usuario.entity.js';
import { AplicativoRepositoryORM } from './infraestructure/aplicativoORM.repository.js';
import { AssinaturaRepositoryORM } from './infraestructure/assinaturaORM.repository.js';
import { ClienteRepositoryORM } from './infraestructure/clienteORM.repository.js';
import { PagamentoRepositoryORM } from './infraestructure/pagamentoORM.repository.js';
import { UsuarioRepositoryORM } from './infraestructure/usuarioORM.repository.js';
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
    TypeOrmModule.forFeature([Aplicativo, Assinatura, Cliente, Pagamento, Usuario]),
  ],
  controllers: [AplicativoController, AssinaturaController, ClienteController, PagamentoController, UsuarioController],
  providers: [
    ServicoCadastramento,
    AplicativoRepositoryORM,
    AssinaturaRepositoryORM,
    ClienteRepositoryORM,
    PagamentoRepositoryORM,
    UsuarioRepositoryORM,
  ],
})
export class AppModule {}
