import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  getHelloWord(): string {
    return 'HOla soy Angel';
  }
}
