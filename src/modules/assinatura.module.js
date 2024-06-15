import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Assinatura } from '../adaptInterface/Persistance/Entities/assinatura.entity';
import { AssinaturaRepositoryORM } from '../adaptInterface/Persistance/Repositories/assinaturaORM.repository';
import { AssinaturaController } from '../adaptInterface/Controllers/assinatura.controller';
import { ServicoAssinaturasValidas } from '../domain/services/servicoAssinaturasValidas.service';
import { NotificarAssinaturaUC } from '../application/assinatura/notificarAssinaturaUC';
import { VerificarAssinaturaValidaUC } from '../application/assinatura/verificarAssinaturaValidaUC';
import { ClienteModule } from './cliente.module';
import { AplicativoModule } from './aplicativo.module';
import { Cliente } from '../adaptInterface/Persistance/Entities/cliente.entity';
import { Aplicativo } from '../adaptInterface/Persistance/Entities/aplicativo.entity';
import { PagamentoModule } from './pagamento.module';

@Module({
    imports: [TypeOrmModule.forFeature([Assinatura, Cliente, Aplicativo]), 
    ClienteModule, 
    AplicativoModule, 
    forwardRef(() => PagamentoModule)],
    controllers: [AssinaturaController],
    providers: [ServicoAssinaturasValidas, AssinaturaRepositoryORM, NotificarAssinaturaUC, VerificarAssinaturaValidaUC],
    exports: [ServicoAssinaturasValidas, NotificarAssinaturaUC, VerificarAssinaturaValidaUC, AssinaturaRepositoryORM]
})
export class AssinaturaModule {}