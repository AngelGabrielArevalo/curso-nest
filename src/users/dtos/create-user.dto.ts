import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ROLES } from 'src/constants';
import { IUser } from 'src/interfaces/user.interface';

export class CreateUserDto implements IUser {
    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsNumber()
    age: number;

    @IsString()
    email: string;

    @IsString()
    username: string;

    @IsString()
    password: string;

    @IsEnum(ROLES)
    role: ROLES;
}
