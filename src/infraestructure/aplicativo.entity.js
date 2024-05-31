const { Entity, Column, PrimaryColumn } = require('typeorm');

@Entity('Aplicativo')
export class Aplicativo {
    @PrimaryColumn('int')
    codigo;

    @Column('varchar')
    nome;

    @Column('decimal', { precision: 10, scale: 2 })
    custoMensal;
}