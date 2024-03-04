import { Injectable, NotFoundException } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        return this.userRepository.save(createUserDto);
    }

    async findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    async findById(id: string): Promise<User | null> {
        return await this.userRepository
            .createQueryBuilder('users')
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
            throw new NotFoundException(
                'El usuario a elimnar es inexistente.',
            );
        }
    }
}
