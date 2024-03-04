import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ROLES } from 'src/constants';
import { IUser } from 'src/interfaces/user.interface';

export class CreateUserDto implements IUser {
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsNotEmpty()
    @IsString()
    lastName: string;

    @IsNotEmpty()
    @IsNumber()
    age: number;

    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsEnum(ROLES)
    role: ROLES;
}
