import { Module } from '@nestjs/common';
import { AplicativoController } from './controllers/aplicativo.controller.js';
import { ServicoCadastramentoService } from './services/servicoCadastramento.service.js'


@Module({
  imports: [],
  controllers: [AplicativoController],
  providers: [ServicoCadastramentoService],
})
export class AppModule {}
