import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Aplicativo')
export class Aplicativo {
    @PrimaryGeneratedColumn()
    codigo;

    @Column('varchar', { length: 50, nullable: false})
    nome;

    @Column('decimal', { precision: 10, scale: 2, nullable: false})
    custoMensal;
}