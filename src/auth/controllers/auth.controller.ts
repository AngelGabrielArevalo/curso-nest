import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request as ExpressRequest } from 'express';

@Controller('auth')
export class AuthController {
    @Post('login')
    @UseGuards(AuthGuard('local'))
    login(@Request() request: ExpressRequest) {
        return request.user;
    }

    @UseGuards(AuthGuard())
    @Get('hola')
    prueba(@Request() request: ExpressRequest) {
        console.log(request.user);
        return { message: 'hola' };
    }
}
