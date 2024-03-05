import { IsEnum, IsUUID, isUUID } from 'class-validator';
import { ACCES_LEVEL } from 'src/constants';
import { IUsersProjects } from 'src/interfaces/usersProjects.interface';
import { User } from '../entities/user.entity';
import { Project } from 'src/projects/entities/projects.entity';

export class CreateUsersProjectsDto implements IUsersProjects {
    @IsUUID()
    user: User;

    @IsUUID()
    project: Project;

    @IsEnum(ACCES_LEVEL)
    acceslevel: ACCES_LEVEL;
}
