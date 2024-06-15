import { Entity, Column, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { ManyToOne } from '../../../../node_modules/typeorm/index';
import { Aplicativo } from './aplicativo.entity';
import { Cliente } from './cliente.entity';

@Entity('Assinatura')
export class Assinatura {
    @PrimaryGeneratedColumn()
    codigo;

    @ManyToOne(() => Cliente, (cliente)=>cliente.codigo, {nullable:false})
    @JoinColumn({ name: 'codCli' })
    codCli;

    @ManyToOne(() => Aplicativo, (aplicativo)=>aplicativo.codigo, {nullable:false})
    @JoinColumn({ name: 'codApp' })
    codApp;

    @Column('date', {nullable:false})
    inicioVigencia;

    @Column('date', {nullable:false})
    fimVigencia;

    @Column('varchar', { length: 10}, {nullable:false})
    status;
}