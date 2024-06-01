import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('Aplicativo')
export class Aplicativo {
    @PrimaryColumn('int')
    codigo;

    @Column('varchar')
    nome;

    @Column('decimal', { precision: 10, scale: 2 })
    custoMensal;
}