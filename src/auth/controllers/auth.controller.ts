import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Request as ExpressRequest } from 'express';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @UseGuards(AuthGuard('local'))
    login(@Request() request: ExpressRequest) {
        return request.user;
    }

    @UseGuards(JwtAuthGuard)
    @Get('hola')
    prueba(@Request() request: ExpressRequest) {
        console.log(request.user);
        return { message: 'hola' };
    }
}
