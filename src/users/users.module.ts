import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersProjects } from './entities/usersProjects.entity';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';

@Module({
    imports: [
        TypeOrmModule.forFeature([User, UsersProjects])
    ],
    providers: [UserService, JwtStrategy],
    controllers: [UserController],
    exports: [UserService, TypeOrmModule],
})
export class UsersModule {}
