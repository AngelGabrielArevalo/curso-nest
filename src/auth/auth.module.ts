import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { UserService } from 'src/users/services/user.service';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
    imports: [JwtModule, UsersModule],
    controllers: [AuthController],
    providers: [AuthService, UserService, JwtService],
    exports: [AuthService, JwtModule],
})
export class AuthModule {}
