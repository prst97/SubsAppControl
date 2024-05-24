import { Controller, Dependencies, Get, Bind, Param, Post, Body } from '@nestjs/common';
import { ServicoCadastramentoService } from '../services/servicoCadastramento.service.js';

@Controller('servcad')
@Dependencies(ServicoCadastramentoService) 
export class AplicativoController {
    constructor(ServicoCadastramentoService) {
        this.ServicoCadastramentoService = ServicoCadastramentoService;
    }

    @Get('aplicativos')
    async getApps() {
        return await this.ServicoCadastramentoService.buscarTodosApps()
    }

    @Post('aplicativos/cadastraAplicativo')
    @Bind(Body())
    async postApp(aplicativo){
        await this.ServicoCadastramentoService.cadastrarApp(aplicativo);
    }
}