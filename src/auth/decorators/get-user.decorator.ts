import {
    ExecutionContext,
    InternalServerErrorException,
    createParamDecorator,
} from '@nestjs/common';
import { Request } from 'express';
import { User } from 'src/users/entities/user.entity';

export const GetUser = createParamDecorator(
    (fieldOfUser: keyof User | undefined, executeContext: ExecutionContext) => {
        const request: Request = executeContext.switchToHttp().getRequest();
        const user = request.user as unknown as User;

        if (!user) {
            throw new InternalServerErrorException(
                'User not found of request.',
            );
        }

        return fieldOfUser ? user[fieldOfUser] : user;
    },
);
