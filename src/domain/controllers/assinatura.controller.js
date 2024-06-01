import { Controller, Dependencies, Get, Delete, Bind, Param, Post, Patch, Body, Query } from '@nestjs/common';
import { AssinaturaRepositoryORM } from '../../infraestructure/assinaturaORM.repository';

@Controller('servcad')
@Dependencies(AssinaturaRepositoryORM) 
export class AssinaturaController {
    constructor(assinaturaRepository) {
        this.assinaturaRepository = assinaturaRepository;
    }

    @Get('assinaturas')
    async getAssinaturas() {
        return await this.assinaturaRepository.buscarTodasAssinaturas();
    }

    @Get('assinaturas/:tipo')
    @Bind(Param('tipo'))
    async getAssinaturasPorTipoStatus(tipo) {
      return await this.assinaturaRepository.buscarPorTipoStatus(tipo);
    }  

    @Get('asscli/:codCli')
    @Bind(Param('codCli'))
    async getAssinaturasPorCodCli(codCli) {
        return await this.assinaturaRepository.buscarPorCliente(codCli);
    }

    @Get('assapp/:codApp')
    @Bind(Param('codApp'))
    async getAssinaturasPorCodApp(codApp) {
        return await this.assinaturaRepository.buscarPorApp(codApp);
    }

    @Post('assinaturas')
    @Bind(Body())
    async postAssinatura(assinatura) {
        return await this.assinaturaRepository.cadastrarAssinatura(assinatura);
    }

    @Delete('removerAssinatura/:codigo')
    @Bind(Param('codigo'))
    async deleteAssinatura(codigo) {
        await this.assinaturaRepository.removerAssinatura(codigo);
    }
}
