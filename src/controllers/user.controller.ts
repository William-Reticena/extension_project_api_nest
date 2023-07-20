import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from '@/services/user.service';
import { CreateUserDto } from '@/dtos/create-user.dto';
import { ResponseDto } from '@/dtos/response.dto';
import { UpdateUserDto } from '@/dtos/update-user.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<ResponseDto> {
    const response = await this.userService.createUser(createUserDto);
    return new ResponseDto(
      response,
      'Usuário criado com sucesso',
      'User created successfully',
      HttpStatus.CREATED,
    );
  }

  @Get(':userId?')
  @UseGuards(AuthGuard('jwt'))
  async getUsers(@Param('userId') userId?: number): Promise<ResponseDto> {
    if (userId) {
      const response = await this.userService.findUserById(userId);
      return new ResponseDto(
        response,
        'Usuário encontrado com sucesso',
        'User found successfully',
        HttpStatus.OK,
      );
    } else {
      const response = await this.userService.findAllUsers();
      return new ResponseDto(
        response,
        'Usuários listados com sucesso',
        'Users listed successfully',
        HttpStatus.OK,
      );
    }
  }

  @Patch(':userId')
  @UseGuards(AuthGuard('jwt'))
  async updateUser(
    @Param('userId') userId: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<ResponseDto> {
    const response = await this.userService.updateUser(userId, updateUserDto);
    return new ResponseDto(
      response,
      'Usuário atualizado com sucesso',
      'User updated successfully',
      HttpStatus.OK,
    );
  }

  @Delete(':userId')
  @UseGuards(AuthGuard('jwt'))
  async deleteUser(@Param('userId') userId: number): Promise<ResponseDto> {
    const response = await this.userService.deleteUser(userId);
    return new ResponseDto(
      response,
      'Usuário deletado com sucesso',
      'User deleted successfully',
      HttpStatus.OK,
    );
  }
}
