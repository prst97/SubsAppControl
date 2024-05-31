import { Controller, Dependencies, Get, Delete, Bind, Param, Post, Patch, Body } from '@nestjs/common';
import { AplicativoRepositoryORM } from '../../infraestructure/aplicativoORM.repository';

@Controller('servcad/apps')
@Dependencies(AplicativoRepositoryORM) 
export class AplicativoController {
    constructor(aplicativoRepository) {
        this.aplicativoRepository = aplicativoRepository;
    }

    @Get()
    async getApps() {
        return await this.aplicativoRepository.buscarTodosApps();
    }

    @Get(':codigo')
    async getAppPorCodigo(codigo) {
        return await this.aplicativoRepository.recuperarPorCodigo(codigo);
    }

    @Post('cadastrarApp')
    @Bind(Body())
    async postApp(aplicativo) {
        await this.aplicativoRepository.cadastrarApp(aplicativo);
    }

    @Patch(':codigo')
    @Bind(Param('codigo'), Body())
    async patchApp(codigo, body) {
        const { custoMensal } = body;
        await this.aplicativoRepository.atualizarCustoMensal(codigo, custoMensal);
    }

    @Delete('removerApp/:codigo')
    @Bind(Param('codigo'))
    async deleteApp(codigo) {
        await this.aplicativoRepository.removerApp(codigo);
    }
}
