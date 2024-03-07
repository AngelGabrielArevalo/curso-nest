import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersProjects } from 'src/users/entities/usersProjects.entity';

@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET, // Define tu clave secreta aquí
            signOptions: { expiresIn: process.env.JWT_EXPIRED_TIME }, // Define el tiempo de expiración del token
        }),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        TypeOrmModule.forFeature([User, UsersProjects]),
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    exports: [
        PassportModule,
        TypeOrmModule,
        LocalStrategy,
        JwtModule,
        JwtStrategy,
    ],
})
export class AuthModule {}
