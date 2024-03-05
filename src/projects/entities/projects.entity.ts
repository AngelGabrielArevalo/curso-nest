import { BaseEntity } from '../../config/base.entity';
import { IProject } from '../../interfaces/project.interface';
import { UsersProjects } from '../../users/entities/usersProjects.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({ name: 'projects' })
export class Project extends BaseEntity implements IProject {
    @Column()
    name: string;

    @Column()
    description: string;

    @OneToMany(() => UsersProjects, (usersProjects) => usersProjects.project)
    usersIncludes: UsersProjects[];
}
