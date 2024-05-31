import { Injectable, Dependencies } from "@nestjs/common";
import { AplicativoRepositoryORM } from "../../infraestructure/aplicativoORM.repository.js";

@Injectable()
@Dependencies(AplicativoRepositoryORM)
export class ServicoCadastramento {

    constructor(aplicativoRepository) {
        this.aplicativoRepository = aplicativoRepository;
    }
    // Aplicativo

    async buscarTodosApps() {
        return this.aplicativoRepository.buscarTodosApps()
    }

    async cadastrarApp(aplicativo) {
        return this.aplicativoRepository.cadastrarApp(aplicativo)
    }

    async atualizarCustoMensal(codigo, custoMensal) {
        return this.aplicativoRepository.atualizarCustoMensal(codigo, custoMensal);
    }

    async removerApp(codigo) {
        return this.aplicativoRepository.removerApp(codigo)
    }

    

    // Assinatura

    /** async cadastrarAssinatura(assinatura) {
        const resultado = await query({
            query: 'INSERT INTO Assinatura (codigo, codCli, codApp, inicioVigencia, fimVigencia, status) VALUES (?, ?, ?, ?, ?, ?)',
            values: [assinatura.codigo, assinatura.codCli, assinatura.codApp, assinatura.inicioVigencia, assinatura.fimVigencia, assinatura.status]
        });
        return resultado;
    }

    async buscarAssinaturasPorTipo(tipo) {
        let query = 'SELECT * FROM Assinatura WHERE status = ?';
        let values = [];
      
        switch (tipo.toUpperCase()) {
          case 'ATIVAS':
            values = ['ATIVA']
            break;
          case 'CANCELADAS':
            query += ' WHERE status = ?';
            values = ['CANCELADA']
            break;
          case 'TODAS':
            // Nenhum filtro adicional necessário
            break;
          default:
            throw new Error(`Tipo inválido: ${tipo}`);
        }
      
        const resultado = await query({
          query: query,
          values: values,
        });

        return resultado;
    }
    
    async buscarAssinaturasPorApp(codApp){
        const resultado = await query({
            query: 'SELECT * FROM Assinatura WHERE codApp = ?',
            values: [codApp]
        });
        return resultado;
    }

    async removerAssinatura(codigo) {
        const resultado = await query({
            query: 'DELETE FROM Aplicativo WHERE codigo = ?',
            values: [codigo]
        });
        return resultado;
    }

    // Cliente

    async cadastrarCliente(cliente) {
        const resultado = await query({
            query: 'INSERT INTO Cliente (codigo, nome, email) VALUES (?, ?, ?)',
            values: [cliente.codigo, cliente.nome, cliente.email]
        });
        return resultado;
    }

    async buscarTodosClientes() {
        const clientes = await query({
            query: 'SELECT * FROM Cliente',
            values: []
        });
        return clientes;
    }

    async removerCliente(codigo) {
        const resultado = await query({
            query: 'DELETE FROM Aplicativo WHERE codigo = ?',
            values: [codigo]
        });
        return resultado;
    } **/

}