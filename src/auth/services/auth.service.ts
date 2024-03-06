import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UserService } from 'src/users/services/user.service';
import { validatePassword } from 'src/utils/functions/validatePassword';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private readonly userService: UserService,
    ) {}

    async validateAndGetUser(
        usenameOrEmail: string,
        password: string,
    ): Promise<User | null> {
        const user =
            await this.userService.findByUsernameOrEmail(usenameOrEmail);

        if (!user || !(await validatePassword(password, user.password))) {
            return null;
        }

        return user;
    }
}
