const { Entity, Column, PrimaryGeneratedColumn } = require('typeorm');

@Entity()
class Aplicativo {
    @PrimaryGeneratedColumn()
    codigo;

    @Column()
    nome;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    custoMensal;
}

module.exports = Aplicativo;
