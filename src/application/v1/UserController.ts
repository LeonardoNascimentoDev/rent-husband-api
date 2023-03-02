import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import {
    ApiBadRequestResponse,
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
    @ApiOperation({ summary: 'Get all rent husbands' })
    @ApiOkResponse({ description: 'Return list of all rent husbands' })
    async getAll(): Promise<User[]> {
        return this.userService.getAll()
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get rent husband by id' })
    @ApiOkResponse({ description: 'Success in looking for rent husband' })
    @ApiNotFoundResponse({ description: 'Rent husband not found for id' })
    async findById(@Param('id') id: string): Promise<User> {
        return this.userService.findByRentHusbandById(id)
    }

    @Post('create')
    @ApiOperation({ summary: 'Create a user' })
    @ApiCreatedResponse({ description: 'Record created successfully!' })
    @ApiBadRequestResponse({
        description:
            'An invalid date or a date older than the current one was informed',
    })
    @ApiConflictResponse({ description: 'User already registered!' })
    @ApiBody({ type: CreateUserDTO })
    async saveRentHusband(
        @Body() payload: CreateUserDTO,
    ): Promise<User> {
        return this.userService.executeSave(payload)
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update rent husband' })
    @ApiBody({ type: CreateUserDTO })
    @ApiOkResponse({ description: 'Sucessfully update rent husband' })
    @ApiNotFoundResponse({
        description: 'No rent husband found for the given id',
    })
    @ApiConflictResponse({ description: 'The rent husband already exists!' })
    @ApiBadRequestResponse({
        description:
            'An invalid date or a date older than the current one was informed',
    })
    async update(
        @Param('id') id: string,
        @Body() rentHusbandUpdated: UpdateUserDTO,
    ): Promise<User> {
        return this.userService.executeUpdate(id, rentHusbandUpdated)
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a rent husband by its id' })
    @ApiNotFoundResponse({ description: 'No location found for id!' })
    @ApiOkResponse({ description: 'Rent husband successfully deleted!' })
    async delete(@Param('id') id: string): Promise<User> {
        return this.userService.deleteById(id)
    }
}
