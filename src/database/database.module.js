import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Usuario } from '../adaptInterface/Persistance/Entities/usuario.entity';

@Global()
@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: configService => ({
                type: 'mysql',
                host: configService.getOrThrow('DB_HOST'),
                port: configService.getOrThrow('DB_PORT'),
                username: configService.getOrThrow('DB_USER'),
                password: configService.getOrThrow('DB_PASSWORD'),
                database: configService.getOrThrow('DB_DATABASE'),
                entities: [Usuario],
                autoLoadEntities: true,
                //synchronize: true,
                logging: true,
            }),
            inject: [ConfigService]
        })
    ]
})
export class DatabaseModule {}