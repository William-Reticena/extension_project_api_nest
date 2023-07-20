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
import { CreateUserReqDTO } from '@/dtos/create-user-req.dto'
import { CreateUserResDTO } from '@/dtos/create-user-res.dto'
import { UpdateUserReqDTO } from '@/dtos/update-user-req.dto'
import { ResponseDTO } from '@/dtos/response.dto'

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(
    @Body() createUserReqDTO: CreateUserReqDTO,
  ): Promise<ResponseDTO> {
    const response = await this.userService.createUser(createUserReqDTO)
    return new ResponseDTO(
      new CreateUserResDTO(response),
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
    @Body() updateUserReqDto: UpdateUserReqDTO,
  ): Promise<ResponseDTO> {
    const response = await this.userService.updateUser(userId, updateUserReqDto)
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
