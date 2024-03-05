import { ACCES_LEVEL } from 'src/constants';
import { Project } from 'src/projects/entities/projects.entity';
import { User } from 'src/users/entities/user.entity';

export interface IUsersProjects {
    user: User;
    project: Project;
    acceslevel: ACCES_LEVEL;
}
