import { BaseEntity } from '../../config/base.entity';
import { ACCES_LEVEL } from '../../constants';
import { Column, Entity, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Project } from '../../projects/entities/projects.entity';

@Entity({ name: 'users_projects' })
export class UsersProjects extends BaseEntity {
    @Column({ type: 'enum', enum: ACCES_LEVEL })
    acceslevel: ACCES_LEVEL;

    @ManyToOne(() => User, (user) => user.projectsIncludes)
    user: User;

    @ManyToOne(() => Project, (project) => project.usersIncludes)
    project: Project;
}
