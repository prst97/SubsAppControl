import { Controller, Dependencies, Get, Delete, Bind, Param, Post, Body, Patch, HttpException, HttpStatus, ParseIntPipe, UsePipes } from '@nestjs/common';
import { ServicoCadastramento } from '../../domain/services/servicoCadastramento.service';
import { ServicoAssinaturasValidas } from '../../domain/services/servicoAssinaturasValidas.service';
import { VerificarAssinaturaValidaUC } from '../../application/assinatura/verificarAssinaturaValidaUC';
import { CriarAssinaturaValidatorPipe } from '../../validations/assinatura/assinatura-criar.validator';


@Controller('servcad')
@Dependencies(ServicoCadastramento, ServicoAssinaturasValidas, VerificarAssinaturaValidaUC) 
export class AssinaturaController {
    constructor(servicoCadastramento, servicoAssinaturasValidas, verificarAssinaturaValidaUC) {
        this.servicoCadastramento = servicoCadastramento;
        this.servicoAssinaturasValidas = servicoAssinaturasValidas;
        this.verificarAssinaturaValidaUC = verificarAssinaturaValidaUC;
    }

    @Get('assinaturas')
    async getAssinaturas() {
        try {
            const assinaturas = await this.servicoCadastramento.buscarTodasAssinaturas();
            if (assinaturas.length > 0) {
                return assinaturas
            } else {
                console.log(`error: `, 'Lista de assinaturas vazia')
                throw new HttpException('Lista de assinaturas está vazia', HttpStatus.NOT_FOUND)
            }
        } catch (error) {
            console.log(`error: `, error.message)
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
    
    @Get('assinaturas/:codigo')
    @Bind(Param('codigo', ParseIntPipe))
    async getAssinaturaPorCodigo(codigo) {
        try {
            return await this.servicoCadastramento.recuperarAssinaturaPorCodigo(codigo);
        } catch (error) {
            console.log(`error: `, error.message)
            throw new HttpException(error.message, HttpStatus.NOT_FOUND)
        }
    }

    @Get('assinaturas/status/:tipo')
    @Bind(Param('tipo'))
    async getAssinaturasPorTipoStatus(tipo) {
        try{
            const assinaturas = await this.servicoCadastramento.buscarAssinaturasPorTipo(tipo);
            if (assinaturas.length > 0) {
                return assinaturas
            } else {
                console.log(`error: `, 'Lista de assinaturas vazia')
                throw new HttpException('Lista de assinaturas está vazia', HttpStatus.NOT_FOUND)
            }
        } catch (error) {
            console.log(`error: `, error.message)
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }

    }  

    @Get('asscli/:codCli')
    @Bind(Param('codCli', ParseIntPipe))
    async getAssinaturasPorCodCli(codCli) {
        try {
            const assinaturasPorCli = await this.servicoCadastramento.buscarAssinaturasPorCliente(codCli);
            if (assinaturasPorCli.length > 0) {
                return assinaturasPorCli
            } else {
                console.log(`error: `, 'O cliente não possui assinaturas ou não existe')
                throw new HttpException('O cliente não possui assinaturas ou não existe', HttpStatus.NOT_FOUND)
            }
        } catch (error) {
            console.log(`error: `, error.message)
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @Get('assapp/:codApp')
    @Bind(Param('codApp', ParseIntPipe))
    async getAssinaturasPorCodApp(codApp) {
        try {
            const assinaturasPorApp = await this.servicoCadastramento.buscarAssinaturasPorApp(codApp);
            if (assinaturasPorApp.length > 0) {
                return assinaturasPorApp
            } else {
                console.log(`error: `, 'O aplicativo não possui assinaturas ou não existe')
                throw new HttpException('O aplicativo não possui assinaturas ou não existe', HttpStatus.NOT_FOUND)
            }
        } catch (error) {
            console.log(`error: `, error.message)
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @Post('assinaturas')
    @Bind(Body())
    @UsePipes(CriarAssinaturaValidatorPipe)
    async postAssinatura(assinatura) {
        try {
            return await this.servicoCadastramento.cadastrarAssinatura(assinatura);
        } catch (error) {
            console.log(`error: `, error.message)
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @Patch('assinaturas/atualizar/:codigo')
    @Bind(Param('codigo', ParseIntPipe), Body())
    async patchAssinatura(codigo, dados) {
        try {
            return await this.servicoAssinaturasValidas.atualizarAssinatura(codigo, dados)
        } catch(error) {
            console.log(`error: `, error.message)
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @Get('assinaturas/verificarAssinatura/:codigo')
    @Bind(Param('codigo', ParseIntPipe))
    async verificaAssinatura(codigo) {
        try {
            return await this.verificarAssinaturaValidaUC.execute(codigo);
        } catch(error) {
            console.log(`error: `, error.message)
            throw new HttpException(error.message, HttpStatus.NOT_FOUND)
        }
    }

    @Delete('removerAssinatura/:codigo')
    @Bind(Param('codigo', ParseIntPipe))
    async deleteAssinatura(codigo) {
        try {
            await this.servicoCadastramento.removerAssinatura(codigo);
            return {description: `Assinatura de código ${codigo} deletada com sucesso`}
        } catch (error) {
            console.log(`error: `, error.message)
            throw new HttpException(error.message, HttpStatus.NOT_FOUND)
        }
    }
}
