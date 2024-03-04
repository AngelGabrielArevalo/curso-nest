import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Project } from '../entities/projects.entity';
import { CreateProjectDto } from '../dtos/create-project.dto';
import { UpdateProjectDto } from '../dtos/update-project.dto';

@Injectable()
export class ProjectsService {
    constructor(
        @InjectRepository(Project)
        private readonly projectRepository: Repository<Project>,
    ) {}

    async create(createProjectDto: CreateProjectDto): Promise<Project> {
        return this.projectRepository.save(createProjectDto);
    }

    async findAll(): Promise<Project[]> {
        return this.projectRepository.find();
    }

    async findById(id: string): Promise<Project | null> {
        return await this.projectRepository
            .createQueryBuilder('projects')
            .where({ id })
            .getOne();
    }

    async update(
        id: string,
        updateProjectDto: UpdateProjectDto,
    ): Promise<void> {
        const updateResult: UpdateResult = await this.projectRepository.update(
            id,
            updateProjectDto,
        );
        if (updateResult.affected === 0) {
            throw new NotFoundException(
                'El projecto a actualizar es inexistente.',
            );
        }
    }

    async delete(id: string): Promise<void> {
        const deleteResult: DeleteResult =
            await this.projectRepository.delete(id);
        if (deleteResult.affected === 0) {
            throw new NotFoundException(
                'El projecto a elimnar es inexistente.',
            );
        }
    }
}
