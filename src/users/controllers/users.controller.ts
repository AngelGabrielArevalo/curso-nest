import { Controller, Get } from '@nestjs/common';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('prueba')
  getHello(): string {
    return this.userService.getHelloWord();
  }
}
