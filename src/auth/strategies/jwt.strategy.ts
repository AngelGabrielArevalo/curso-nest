import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/users/entities/user.entity';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PayloadToken } from '../interfaces';
import { AuthService } from '../services/auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            secretOrKey: process.env.JWT_SECRET,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    async validate(payloadToken: PayloadToken): Promise<User> {
        const { sub: idUser } = payloadToken;

        const user =
            await this.authService.findUserByUsernameOrEmailOrId(idUser);

        if (!user) {
            throw new UnauthorizedException('Invalid token!');
        }

        return user;
    }
}
