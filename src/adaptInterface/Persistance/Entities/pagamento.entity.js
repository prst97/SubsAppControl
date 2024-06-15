import { Entity, Column, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { ManyToOne } from '../../../../node_modules/typeorm/index';
import { Assinatura } from './assinatura.entity';

@Entity('Pagamento')
export class Pagamento {
    @PrimaryGeneratedColumn()
    codigo;

    @ManyToOne(() => Assinatura, (assinatura)=>assinatura.codigo, {nullable:false})
    @JoinColumn({ name: 'codAssinatura' })
    codAssinatura;

    @Column('decimal', { precision: 10, scale: 2 }, {nullable:false})
    valorPago;

    @Column('date', {nullable:false})
    dataPagamento;
}