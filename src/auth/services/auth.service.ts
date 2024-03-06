import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/users/services/user.service';
import { validatePassword } from 'src/utils';
import { AuthResponse } from '../interfaces/auth-response.interface';
import { PayloadToken } from '../interfaces/token-jwt.interface';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private readonly userService: UserService,
    ) {}

    async validateAndGetAuthResponse(
        usenameOrEmail: string,
        password: string,
    ): Promise<AuthResponse | null> {
        const user =
            await this.userService.findByUsernameOrEmail(usenameOrEmail);

        if (!user || !(await validatePassword(password, user.password))) {
            return null;
        }

        const payload: PayloadToken = {
            sub: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            username: user.username,
            role: user.role,
        };

        return {
            accessToken: await this.generateJWT(payload),
            exipredToken: process.env.JWT_EXPIRED_TIME,
        };
    }

    async generateJWT(payload: PayloadToken): Promise<string> {
        return this.jwtService.sign(payload);
    }
}
