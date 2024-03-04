import { IsNotEmpty, IsString } from 'class-validator';
import { IProject } from 'src/interfaces/project.interface';

export class CreateProjectDto implements IProject {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;
}
