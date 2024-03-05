import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/users/services/user.service';
import { validatePassword } from 'src/utils/functions/validatePassword';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private readonly userService: UserService,
    ) {}

    async validateUserAndGenereteJWT(
        usenameOrEmail: string,
        password: string,
    ): Promise<any> {
        const user =
            await this.userService.findByUsernameOrEmail(usenameOrEmail);

        if (!user || !(await validatePassword(password, user.password))) {
            throw new UnauthorizedException('Usuario o contraseña incorrectos');
        }
        console.log(process.env.JWT_SECRET);
        return {
            accessToken: this.jwtService.sign({
                email: user.email,
                username: user.username,
                role: user.role,
                sub: 123,
            }),
            expiredToken: process.env.JWT_EXPIRED_TIME,
        };
    }
}
