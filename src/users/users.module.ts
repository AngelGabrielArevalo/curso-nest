import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersProjects } from './entities/usersProjects.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([User, UsersProjects]),
        AuthModule
    ],
    providers: [UserService],
    controllers: [UserController],
    exports: [UserService, TypeOrmModule],
})
export class UsersModule {}
