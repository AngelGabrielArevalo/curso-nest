import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { UserService } from 'src/users/services/user.service';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
    imports: [
        UsersModule,
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET, // Define tu clave secreta aquí
            signOptions: { expiresIn: process.env.JWT_EXPIRED_TIME }, // Define el tiempo de expiración del token
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, UserService],
    exports: [],
})
export class AuthModule {}
