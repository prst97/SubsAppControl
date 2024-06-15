import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Cliente')
export class Cliente {
    @PrimaryGeneratedColumn()
    codigo;

    @Column('varchar', { length: 50 }, {nullable:false})
    nome;

    @Column('varchar', { length: 70 }, {nullable:false})
    email;
}