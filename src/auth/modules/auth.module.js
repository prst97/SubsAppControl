import { Module } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { UsuarioModule } from '../../modules/usuario.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../strategy/local.strategy';
import { AuthController } from '../controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstantes } from '../constantes';
import { JwtStrategy } from '../strategy/jwt.strategy';

@Module({
    imports: [
        UsuarioModule,
        PassportModule,
        JwtModule.register({
            secret: jwtConstantes.secret,
            signOptions: { expiresIn: '240s' },
        }),
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    controllers: [AuthController],
})
export class AuthModule {}