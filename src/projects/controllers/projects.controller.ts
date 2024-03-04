import {
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { ProjectsService } from '../services/projects.service';
import { CreateProjectDto } from '../dtos/create-project.dto';
import { UpdateProjectDto } from '../dtos/update-project.dto';

@Controller('projects')
export class ProjectsController {
    constructor(private readonly projectService: ProjectsService) {}

    @Post()
    create(@Body() createProjectDto: CreateProjectDto) {
        return this.projectService.create(createProjectDto);
    }

    @Get(':id')
    async findById(@Param('id') id: string) {
        const project = await this.projectService.findById(id);
        if (!project) {
            throw new NotFoundException('El id ingresado es inexistente.');
        }

        return project;
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateProjectDto: UpdateProjectDto,
    ) {
        this.projectService.update(id, updateProjectDto);
    }

    @Get()
    findAll() {
        return this.projectService.findAll();
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        this.projectService.delete(id);
    }
}
