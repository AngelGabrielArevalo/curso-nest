import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request as ExpressRequest } from 'express';
import { GetUser } from '../decorators/get-user.decorator';

@Controller('auth')
export class AuthController {
    @Post('login')
    @UseGuards(AuthGuard('local'))
    login(@Request() request: ExpressRequest) {
        return request.user;
    }

    @UseGuards(AuthGuard())
    @Get('hola')
    prueba(@GetUser('email') email: string) {
        console.log(email);
        return { message: 'hola' };
    }
}
