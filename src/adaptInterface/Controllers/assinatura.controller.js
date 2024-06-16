import { Controller, Dependencies, Get, Delete, Bind, Param, Post, Body, Patch, HttpException, HttpStatus, ParseIntPipe, UsePipes, UseGuards } from '@nestjs/common';
import { ServicoCadastramento } from '../../domain/services/servicoCadastramento.service';
import { ServicoAssinaturasValidas } from '../../domain/services/servicoAssinaturasValidas.service';
import { VerificarAssinaturaValidaUC } from '../../application/assinatura/verificarAssinaturaValidaUC';
import { CriarAssinaturaValidatorPipe } from '../../validations/assinatura/assinatura-criar.validator';
import { AtualizarAssinaturaValidatorPipe } from '../../validations/assinatura/assinatura-criar.validator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/roles/roles.decorator';

@Controller('servcad')
@Dependencies(ServicoCadastramento, ServicoAssinaturasValidas, VerificarAssinaturaValidaUC) 
export class AssinaturaController {
    constructor(servicoCadastramento, servicoAssinaturasValidas, verificarAssinaturaValidaUC) {
        this.servicoCadastramento = servicoCadastramento;
        this.servicoAssinaturasValidas = servicoAssinaturasValidas;
        this.verificarAssinaturaValidaUC = verificarAssinaturaValidaUC;
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin', 'comum')
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
    
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin', 'comum')
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

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin', 'comum')
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

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin', 'comum')
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

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin', 'comum')
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

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Post('cadastrarAssinatura')
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

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Patch('assinaturas/atualizar/:codigo')
    @Bind(Param('codigo', ParseIntPipe), Body(new AtualizarAssinaturaValidatorPipe()))
    async patchAssinatura(codigo, dados) {
        try {
            return await this.servicoAssinaturasValidas.atualizarAssinatura(codigo, dados)
        } catch(error) {
            console.log(`error: `, error.message)
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin', 'comum')
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

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
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
