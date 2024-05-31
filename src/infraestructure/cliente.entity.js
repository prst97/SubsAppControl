import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('Cliente')
export class Cliente {
    @PrimaryColumn('int')
    codigo;

    @Column('varchar')
    nome;

    @Column('varchar')
    email;
}