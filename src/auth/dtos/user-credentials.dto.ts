import { IsString } from 'class-validator';
import { UserCredentials } from '../interfaces/user-credentials.iterface';

export class UserCredentialsDto implements UserCredentials {
    @IsString()
    usernameOrEmail: string;

    @IsString()
    password: string;
}
