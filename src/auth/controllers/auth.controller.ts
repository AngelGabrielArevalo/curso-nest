import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { UserCredentialsDto } from '../dtos/user-credentials.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    login(@Body() { usernameOrEmail, password }: UserCredentialsDto) {
        return this.authService.validateUserAndGenereteJWT(usernameOrEmail, password);
    }
}
