import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GatosService } from './gatos.service';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { UpdateUserDto } from '../users/dtos/update-user.dto';

@Controller('gatos')
export class GatosController {
  constructor(private readonly gatosService: GatosService) {}

  @Post()
  create(@Body() createGatoDto: CreateUserDto) {
    return this.gatosService.create(createGatoDto);
  }

  @Get()
  findAll() {
    return this.gatosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gatosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGatoDto: UpdateUserDto) {
    return this.gatosService.update(+id, updateGatoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gatosService.remove(+id);
  }
}
