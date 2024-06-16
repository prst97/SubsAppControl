import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Usuario')
export class Usuario {
    @PrimaryGeneratedColumn()
    id;

    @Column('varchar', { length: 30 })
    usuario;

    @Column('varchar', { length: 30 })
    senha;

    @Column('varchar', { length: 20 })
    role;
}