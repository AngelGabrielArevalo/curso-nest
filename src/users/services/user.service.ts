import { Injectable, NotFoundException } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { CreateUsersProjectsDto } from '../dtos/crearte-users-projects.dto';
import { UsersProjects } from '../entities/usersProjects.entity';
import { hashPassword } from '../../utils';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(UsersProjects)
        private readonly usersProjectsRepository: Repository<UsersProjects>,
    ) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        const hashedPassword = await hashPassword(createUserDto.password);
        return this.userRepository.save({
            ...createUserDto,
            password: hashedPassword,
        });
    }

    async findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    async findById(id: string): Promise<User | null> {
        return await this.userRepository
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.projectsIncludes', 'projectsIncludes')
            .leftJoinAndSelect('projectsIncludes.project', 'project')
            .where({ id })
            .getOne();
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<void> {
        const updateResult: UpdateResult = await this.userRepository.update(
            id,
            updateUserDto,
        );
        if (updateResult.affected === 0) {
            throw new NotFoundException(
                'El ususario a actualizar es inexistente.',
            );
        }
    }

    async delete(id: string): Promise<void> {
        const deleteResult: DeleteResult = await this.userRepository.delete(id);
        if (deleteResult.affected === 0) {
            throw new NotFoundException('El usuario a elimnar es inexistente.');
        }
    }

    async relationToProject(
        createUsersProjectsDto: CreateUsersProjectsDto,
    ): Promise<UsersProjects> {
        return this.usersProjectsRepository.save(createUsersProjectsDto);
    }

    async findByUsernameOrEmail(usernameOrEmail: string): Promise<User | null> {
        return this.userRepository
            .createQueryBuilder('user')
            .where('user.username = :username', { username: usernameOrEmail })
            .orWhere('user.email = :email', { email: usernameOrEmail })
            .getOne();
    }
}
