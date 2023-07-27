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
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { UserService } from '@/services/user.service'
import { CreateUserDTO, UpdateUserDTO } from '@/dtos/request'
import { CreateUserResDTO, ResponseDTO } from '@/dtos/response'

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() createUserDTO: CreateUserDTO): Promise<ResponseDTO> {
    const response = await this.userService.createUser(createUserDTO)
    return new ResponseDTO(
      response,
      'Usuário criado com sucesso',
      'User created successfully',
      HttpStatus.CREATED,
    )
  }

  @Get(':userId?')
  @UseGuards(AuthGuard('jwt'))
  async getUsers(@Param('userId') userId?: number): Promise<ResponseDTO> {
    if (userId) {
      const response = await this.userService.findUserById(userId)
      return new ResponseDTO(
        response,
        'Usuário encontrado com sucesso',
        'User found successfully',
        HttpStatus.OK,
      )
    } else {
      const response = await this.userService.findAllUsers()
      return new ResponseDTO(
        response,
        'Usuários listados com sucesso',
        'Users listed successfully',
        HttpStatus.OK,
      )
    }
  }

  @Patch(':userId')
  @UseGuards(AuthGuard('jwt'))
  async updateUser(
    @Param('userId') userId: number,
    @Body() updateUserDto: UpdateUserDTO,
  ): Promise<ResponseDTO> {
    const response = await this.userService.updateUser(userId, updateUserDto)
    return new ResponseDTO(
      response,
      'Usuário atualizado com sucesso',
      'User updated successfully',
      HttpStatus.OK,
    )
  }

  @Delete(':userId')
  @UseGuards(AuthGuard('jwt'))
  async deleteUser(@Param('userId') userId: number): Promise<ResponseDTO> {
    const response = await this.userService.deleteUser(userId)
    return new ResponseDTO(
      response,
      'Usuário deletado com sucesso',
      'User deleted successfully',
      HttpStatus.OK,
    )
  }
}
