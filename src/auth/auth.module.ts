import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { UserService } from 'src/users/services/user.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';

@Module({
    imports: [
        UsersModule,
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET, // Define tu clave secreta aquí
            signOptions: { expiresIn: process.env.JWT_EXPIRED_TIME }, // Define el tiempo de expiración del token
        }),
        PassportModule.register({ defaultStrategy: 'jwt' }),
    ],
    controllers: [AuthController],
    providers: [AuthService, UserService, LocalStrategy, JwtStrategy],
    exports: [PassportModule],
})
export class AuthModule {}
