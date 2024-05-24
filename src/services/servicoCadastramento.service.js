import { Injectable } from "@nestjs/common";
import { query } from "../dbConfig/dbConfig.js";

@Injectable()
export class ServicoCadastramentoService {
    async buscarTodosApps() {
        const aplicativos = await query({
            query: 'SELECT * FROM Aplicativo',
            values: []
        });
        return aplicativos
    }

    async cadastrarApp(aplicativo) {
        const resultado = await query({
            query: 'INSERT INTO Aplicativo (codigo, nome, custoMensal) VALUES (?, ?, ?)',
            values: [aplicativo.codigo, aplicativo.nome, aplicativo.custoMensal]
        });
    }
}