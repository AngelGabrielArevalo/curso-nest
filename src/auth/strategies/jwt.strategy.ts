import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/users/entities/user.entity';
import {
    Inject,
    Injectable,
    UnauthorizedException,
    forwardRef,
} from '@nestjs/common';
import { UserService } from 'src/users/services/user.service';
import { PayloadToken } from '../interfaces';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @Inject(forwardRef(() => UserService))
        private readonly userService: UserService,
    ) {
        super({
            secretOrKey: process.env.JWT_SECRET,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    async validate(payloadToken: PayloadToken): Promise<User> {
        const { sub: idUser } = payloadToken;

        const user = await this.userService.findById(idUser);

        if (!user) {
            throw new UnauthorizedException('Invalid token!');
        }

        return user;
    }
}
