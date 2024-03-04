import {
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    @Get(':id')
    async findById(@Param('id') id: string) {
        const user = await this.userService.findById(id);
        if (!user) {
            throw new NotFoundException('El id ingresado es inexistente.');
        }

        return user;
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(id, updateUserDto);
    }

    @Get()
    findAll() {
        return this.userService.findAll();
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.userService.delete(id);
    }
}
