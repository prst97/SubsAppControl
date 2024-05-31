import { Entity, Column, PrimaryColumn, JoinColumn } from 'typeorm';
import { ManyToOne } from '../../node_modules/typeorm/index';
import { Aplicativo } from './aplicativo.entity';
import { Cliente } from './cliente.entity';

@Entity('Assinatura')
export class Assinatura {
    @PrimaryColumn('int')
    codigo;

    @ManyToOne(() => Cliente, (cliente)=>cliente.codigo, {nullable:false})
    @JoinColumn({ name: 'codCli' })
    codCli;

    @ManyToOne(() => Aplicativo, (aplicativo)=>aplicativo.codigo, {nullable:false})
    @JoinColumn({ name: 'codApp' })
    codApp;

    @Column('date')
    inicioVigencia;

    @Column('date')
    fimVigencia;

    @Column('varchar')
    status;
}