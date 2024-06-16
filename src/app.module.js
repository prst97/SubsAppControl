import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AplicativoModule } from './modules/aplicativo.module.js';
import { AssinaturaModule } from './modules/assinatura.module.js';
import { PagamentoModule } from './modules/pagamento.module.js';
import { ClienteModule } from './modules/cliente.module.js';
import { UsuarioModule } from './modules/usuario.module.js';
import { AuthModule } from './auth/modules/auth.module.js';
import { GlobalModule } from './modules/global.module.js';
import { DatabaseModule } from './database/database.module.js';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    DatabaseModule,
    AplicativoModule,
    AssinaturaModule,
    PagamentoModule,
    ClienteModule,
    UsuarioModule,
    AuthModule,
    GlobalModule,
  ],
})
export class AppModule {}
