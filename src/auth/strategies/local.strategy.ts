import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../services/auth.service';
import { AuthResponse } from '../interfaces/auth-response.interface';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super();
    }

    async validate(
        usernameOrEmail: string,
        password: string,
    ): Promise<AuthResponse | null> {
        return this.authService.signIn(
            usernameOrEmail,
            password,
        );
    }
}
