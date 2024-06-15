import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from '../adaptInterface/Persistance/Entities/cliente.entity';
import { ClienteRepositoryORM } from '../adaptInterface/Persistance/Repositories/clienteORM.repository';
import { ClienteController } from '../adaptInterface/Controllers/cliente.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Cliente])],
    controllers: [ClienteController],
    providers: [ClienteRepositoryORM],
    exports: [ClienteRepositoryORM]
})
export class ClienteModule {}