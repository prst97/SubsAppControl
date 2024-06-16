import { Controller, Dependencies, Bind, Request, Post, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { AuthService } from '../services/auth.service';

@Controller('auth')
@Dependencies(AuthService)
export class AuthController {
    constructor(authService) {
        this.authService = authService;
    }

    @UseGuards(LocalAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Post('login')
    @Bind(Request())
    async login(req) {
        return this.authService.login(req.user);
    }
}
