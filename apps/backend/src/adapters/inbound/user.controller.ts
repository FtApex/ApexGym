import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { UserService, PublicUser } from '../../application/user.service';
import { Roles } from '../../infrastructure/auth/roles.decorator';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { ValidatedBody } from './dto/validated-body.decorator';

@Controller('users')
@Roles('SUPER_ADMIN', 'COMPANY_ADMIN')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAll(): Promise<PublicUser[]> {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<PublicUser> {
    const user = await this.userService.getUserById(id);
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return user;
  }

  @Post()
  async create(@ValidatedBody() userData: CreateUserDto): Promise<PublicUser> {
    return this.userService.createUser(userData);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @ValidatedBody() userData: UpdateUserDto,
  ): Promise<PublicUser> {
    const user = await this.userService.updateUser(id, userData);
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado para actualizar`);
    }
    return user;
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    await this.userService.deleteUser(id);
    return { message: `Usuario con ID ${id} eliminado correctamente` };
  }
}
