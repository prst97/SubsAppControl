import { Controller, Dependencies, Get, Delete, Bind, Param, Post, Patch, Body } from '@nestjs/common';
import { AplicativoRepositoryORM } from '../../infraestructure/aplicativoORM.repository';

@Controller('servcad')
@Dependencies(AplicativoRepositoryORM) 
export class AplicativoController {
    constructor(aplicativoRepository) {
        this.aplicativoRepository = aplicativoRepository;
    }

    @Get('aplicativos')
    async getApps() {
        return await this.aplicativoRepository.buscarTodosApps();
    }

    @Get('aplicativos/:codigo')
    async getAppPorCodigo(codigo) {
        return await this.aplicativoRepository.recuperarPorCodigo(codigo);
    }

    @Post('cadastrarApp')
    @Bind(Body())
    async postApp(aplicativo) {
        return await this.aplicativoRepository.cadastrarApp(aplicativo);
    }

    @Patch('/aplicativos/atualizarCusto/:codigo')
    @Bind(Param('codigo'), Body())
    async patchApp(codigo, body) {
        const { custoMensal } = body;
        return await this.aplicativoRepository.atualizarCustoMensal(codigo, custoMensal);
    }

    @Delete('removerApp/:codigo')
    @Bind(Param('codigo'))
    async deleteApp(codigo) {
        await this.aplicativoRepository.removerApp(codigo);
    }
}
