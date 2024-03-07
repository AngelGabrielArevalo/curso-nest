import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { validatePassword } from 'src/utils';
import { AuthResponse } from '../interfaces/auth-response.interface';
import { PayloadToken } from '../interfaces/token-jwt.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { isUUID } from 'class-validator';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async signIn(
        usenameOrEmail: string,
        password: string,
    ): Promise<AuthResponse | null> {
        const user = await this.findUserByUsernameOrEmailOrId(usenameOrEmail);

        if (!user || !(await validatePassword(password, user.password))) {
            return null;
        }

        const payload: PayloadToken = {
            sub: user.id,
            role: user.role,
        };
        console.log('llegue acaasdadad');
        return {
            accessToken: await this.generateJWT(payload),
            exipredToken: process.env.JWT_EXPIRED_TIME,
        };
    }

    async generateJWT(payload: PayloadToken): Promise<string> {
        return this.jwtService.signAsync(payload, {
            secret: process.env.JWT_SECRET,
            expiresIn: process.env.JWT_EXPIRED_TIME,
        });
    }

    async findUserByUsernameOrEmailOrId(
        usernameOrEmailOrId: string,
    ): Promise<User> {
        const queryBuilder = this.userRepository.createQueryBuilder('user');

        if (isUUID(usernameOrEmailOrId)) {
            queryBuilder.where('user.id = :id', { id: usernameOrEmailOrId });
        } else {
            queryBuilder
                .where('user.username = :username', {
                    username: usernameOrEmailOrId,
                })
                .orWhere('user.email = :email', { email: usernameOrEmailOrId });
        }

        return queryBuilder.getOne();
    }
}
