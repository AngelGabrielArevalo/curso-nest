import { Module } from '@nestjs/common';
import { ProjectsService } from './services/projects.service';
import { ProjectsController } from './controllers/projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/projects.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Project])],
    providers: [ProjectsService],
    controllers: [ProjectsController],
})
export class ProjectsModule {}
