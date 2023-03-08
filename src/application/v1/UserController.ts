import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import {
    // ApiBadRequestResponse,
    ApiBody,
    ApiConflictResponse,
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
} from '@nestjs/swagger'
import { CreateUserDTO } from '../../domain/dto/CreateUserDTO'
import { UpdateUserDTO } from '../../domain/dto/UpdateUserDTO'
import { User } from '../../domain/model/User'
import UserService from '../../service/UserService'

@Controller('api/v1/user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    @ApiOperation({ summary: 'Obter todos os usuários' })
    @ApiOkResponse({ description: 'Lista de retorno de todos os usuários' })
    async getAll(): Promise<User[]> {
        return this.userService.getAll()
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obter usuário por id' })
    @ApiOkResponse({ description: 'Sucesso na procura de usuário' })
    @ApiNotFoundResponse({ description: 'Usuário não encontrado para id' })
    async findById(@Param('id') id: string): Promise<User> {
        return this.userService.findByUserById(id)
    }

    @Post('create')
    @ApiOperation({ summary: 'Criar um usuário' })
    @ApiCreatedResponse({ description: 'Registro criado com sucesso!' })
    @ApiConflictResponse({ description: 'Usuário já cadastrado!' })
    @ApiBody({ type: CreateUserDTO })
    async createUser(@Body() payload: CreateUserDTO): Promise<User> {
        return this.userService.executeCreateUser(payload)
    }

    @Put(':id')
    @ApiOperation({ summary: 'Atualizar usuário' })
    @ApiBody({ type: CreateUserDTO })
    @ApiOkResponse({ description: 'Usuário atualizado com sucesso' })
    @ApiNotFoundResponse({
        description: 'Nenhum usuário encontrado para o id fornecido',
    })
    @ApiConflictResponse({ description: 'O usuário já existe!' })
    async update(
        @Param('id') id: string,
        @Body() userUpdated: UpdateUserDTO,
    ): Promise<User> {
        return this.userService.executeUpdate(id, userUpdated)
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Excluir um usuário por seu id' })
    @ApiNotFoundResponse({ description: 'Nenhum local encontrado para id!' })
    @ApiOkResponse({ description: 'Usuário deletado com sucesso!!' })
    async delete(@Param('id') id: string): Promise<User> {
        return this.userService.deleteById(id)
    }
}
