import { Controller, Dependencies, Get, Delete, Bind, Param, Post, Patch, Body, HttpException, HttpStatus, ParseIntPipe, UsePipes, UseGuards } from '@nestjs/common';
import { ServicoCadastramento } from '../../domain/services/servicoCadastramento.service';
import { CriarAplicativoValidatorPipe, AtualizarCustoAplicativoValidatorPipe } from '../../validations/aplicativo/aplicativo.validator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/roles/roles.decorator';

@Controller('servcad')
@Dependencies(ServicoCadastramento) 
export class AplicativoController {
    constructor(servicoCadastramento) {
        this.servicoCadastramento = servicoCadastramento;
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin', 'comum')
    @Get('aplicativos')
    async getApps() {
        try{
            const apps = await this.servicoCadastramento.buscarTodosApps();
            if (apps.length > 0) {
                return apps
            } else {
                console.log(`error: `, 'Lista de aplicativos vazia');
                throw new HttpException('Lista de aplicativos está vazia', HttpStatus.NOT_FOUND);
            }
        } catch (error) {
            console.log(`error: `, error.message);
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin', 'comum')
    @Get('aplicativos/:codigo')
    @Bind(Param('codigo', ParseIntPipe))
    async getAppPorCodigo(codigo) {
        try{
            return await this.servicoCadastramento.recuperarAplicativoPorCodigo(codigo);
        }catch (error) {
            console.log(`error: `, error.message)
            throw new HttpException(error.message, HttpStatus.NOT_FOUND)
        }
    }
    
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Post('cadastrarApp')
    @Bind(Body())
    @UsePipes(CriarAplicativoValidatorPipe)
    async postApp(aplicativo) {
        try{
            return await this.servicoCadastramento.cadastrarApp(aplicativo);
        } catch(error) {
            console.log(`error: `, error.message)
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Patch('aplicativos/atualizarCusto/:codigo')
    @Bind(Param('codigo', ParseIntPipe), Body(new AtualizarCustoAplicativoValidatorPipe()))
    async patchApp(codigo, body) {
        try{
            const { custoMensal } = body;
            console.log(typeof(custoMensal))
            if(typeof(custoMensal) === 'number'){
                return await this.servicoCadastramento.atualizarCustoMensal(codigo, custoMensal);
            } else {
                console.log(`error: O custoMensal deve ser um número`)
                throw new HttpException('O custoMensal deve ser um número', HttpStatus.BAD_REQUEST)
            }
        
        } catch(error) {
            console.log(`error: `, error.message)
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Delete('removerApp/:codigo')
    @Bind(Param('codigo', ParseIntPipe))
    async deleteApp(codigo) {
        try{
            await this.servicoCadastramento.removerApp(codigo);
            return {description: `Aplicativo de código ${codigo} deletado com sucesso`}
        } catch (error) {
            console.log(`error: `, error.message)
            throw new HttpException(error.message, HttpStatus.NOT_FOUND)
        }
    }
}
