import { BaseEntity } from '../../config/base.entity';
import { ACCES_LEVEL } from '../../constants';
import { Column, Entity, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';
import { ProjectEntity } from '../../projects/entities/projects.entity';

@Entity({ name: 'users_projects' })
export class UsersProjectsEntity extends BaseEntity {
    @Column({ type: 'enum', enum: ACCES_LEVEL })
    acceslevel: ACCES_LEVEL;

    @ManyToOne(() => UserEntity, (user) => user.projectsIncludes)
    user: UserEntity;

    @ManyToOne(() => ProjectEntity, (project) => project.usersIncludes)
    project: ProjectEntity;
}
