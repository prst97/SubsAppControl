import { Module, Global } from '@nestjs/common';
import { ServicoCadastramento } from '../domain/services/servicoCadastramento.service';
import { AplicativoModule } from './aplicativo.module';
import { AssinaturaModule } from './assinatura.module';
import { PagamentoModule } from './pagamento.module';
import { ClienteModule } from './cliente.module';
import { UsuarioModule } from './usuario.module';

@Global()
@Module({
    imports: [AplicativoModule, AssinaturaModule, PagamentoModule, ClienteModule, UsuarioModule],
    providers: [ServicoCadastramento],
    exports: [ServicoCadastramento],
})
export class GlobalModule {}