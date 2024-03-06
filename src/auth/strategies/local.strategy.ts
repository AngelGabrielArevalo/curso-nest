import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../services/auth.service';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super();
    }

    async validate(
        usernameOrEmail: string,
        password: string,
    ): Promise<User | null> {
        return this.authService.validateAndGetUser(usernameOrEmail, password);
    }
}
