import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { UpdateUserDto } from '../users/dtos/update-user.dto';

@Injectable()
export class GatosService {
  create(createGatoDto: CreateUserDto) {
    return 'This action adds a new gato';
  }

  findAll() {
    return `This action returns all gatos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} gato`;
  }

  update(id: number, updateGatoDto: UpdateUserDto) {
    return `This action updates a #${id} gato`;
  }

  remove(id: number) {
    return `This action removes a #${id} gato`;
  }
}
