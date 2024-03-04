import { BaseEntity } from '../../config/base.entity';
import { ROLES } from '../../constants';
import { IUser } from '../../interfaces/user.interface';
import { Column, Entity, OneToMany } from 'typeorm';
import { UsersProjects } from './usersProjects.entity';

@Entity({ name: 'users' })
export class User extends BaseEntity implements IUser {
    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

    @Column({ unique: true })
    email: string;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    @Column({ type: 'enum', enum: ROLES })
    role: ROLES;

    @OneToMany(
        () => UsersProjects,
        (usersProjects) => usersProjects.project,
    )
    projectsIncludes: UsersProjects[];
}
