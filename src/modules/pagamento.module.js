import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pagamento } from '../adaptInterface/Persistance/Entities/pagamento.entity';
import { PagamentoRepositoryORM } from '../adaptInterface/Persistance/Repositories/pagamentoORM.repository';
import { PagamentoController } from '../adaptInterface/Controllers/pagamento.controller';
import { RealizarPagamentoUC } from '../application/pagamento/realizarPagamentoUC';
import { AssinaturaModule } from './assinatura.module';
import { Assinatura } from '../adaptInterface/Persistance/Entities/assinatura.entity';
import { ServicoPagamento } from '../domain/services/servicoPagamentos.service';

@Module({
    imports: [TypeOrmModule.forFeature([Pagamento, Assinatura]), 
    forwardRef(() => AssinaturaModule)],
    controllers: [PagamentoController],
    providers: [RealizarPagamentoUC, PagamentoRepositoryORM, ServicoPagamento],
    exports: [RealizarPagamentoUC, PagamentoRepositoryORM, ServicoPagamento]
})
export class PagamentoModule {}