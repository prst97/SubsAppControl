import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from '../adaptInterface/Persistance/Entities/usuario.entity';
import { UsuarioRepositoryORM } from '../adaptInterface/Persistance/Repositories/usuarioORM.repository';
import { UsuarioController } from '../adaptInterface/Controllers/usuario.controller';
   
@Module({
    imports: [TypeOrmModule.forFeature([Usuario])],
    controllers: [UsuarioController],
    providers: [UsuarioRepositoryORM],
    exports: [UsuarioRepositoryORM]
})
export class UsuarioModule {}