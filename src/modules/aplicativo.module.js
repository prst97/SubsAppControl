import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Aplicativo } from '../adaptInterface/Persistance/Entities/aplicativo.entity';
import { AplicativoRepositoryORM } from '../adaptInterface/Persistance/Repositories/aplicativoORM.repository';
import { AplicativoController } from '../adaptInterface/Controllers/aplicativo.controller';
   
@Module({
    imports: [TypeOrmModule.forFeature([Aplicativo])],
    controllers: [AplicativoController],
    providers: [AplicativoRepositoryORM],
    exports: [AplicativoRepositoryORM]
})
export class AplicativoModule {}