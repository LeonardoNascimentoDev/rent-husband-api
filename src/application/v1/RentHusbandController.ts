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
import { CreateRentHusbandDTO } from '../../domain/dto/CreateRentHusbandDTO'
import { UpdateRentHusbandDTO } from '../../domain/dto/UpdateRentHusbandDTO'
import { RentHusband } from '../../domain/model/RentHusband'
import RentHusbandService from '../../service/RentHusbandService'

@Controller('api/v1/rent-husband')
export class RentHusbandController {
    constructor(private readonly rentHusbandService: RentHusbandService) {}

    @Get()
    @ApiOperation({ summary: 'Get all rent husbands' })
    @ApiOkResponse({ description: 'Return list of all rent husbands' })
    async getAll(): Promise<RentHusband[]> {
        return this.rentHusbandService.getAll()
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get rent husband by id' })
    @ApiOkResponse({ description: 'Success in looking for rent husband' })
    @ApiNotFoundResponse({ description: 'Rent husband not found for id' })
    async findById(@Param('id') id: string): Promise<RentHusband> {
        return this.rentHusbandService.findByRentHusbandById(id)
    }

    @Post('save')
    @ApiOperation({ summary: 'Create a rent husband' })
    @ApiCreatedResponse({ description: 'Record created successfully!' })
    @ApiBadRequestResponse({
        description:
        'An invalid date or a date older than the current one was informed',
        })
    @ApiConflictResponse({ description: 'Rent Husband already registered!' })
    @ApiBody({ type: CreateRentHusbandDTO })
    async saveRentHusband(
        @Body() payload: CreateRentHusbandDTO,
    ): Promise<RentHusband> {
        return this.rentHusbandService.executeSave(payload)
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update rent husband' })
    @ApiBody({ type: UpdateRentHusbandDTO })
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
        @Body() rentHusbandUpdated: UpdateRentHusbandDTO,
    ): Promise<RentHusband> {
        return this.rentHusbandService.executeUpdate(id, rentHusbandUpdated)
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a rent husband by its id' })
    @ApiNotFoundResponse({ description: 'No location found for id!' })
    @ApiOkResponse({ description: 'Rent husband successfully deleted!' })
    async delete(@Param('id') id: string): Promise<RentHusband> {
        return this.rentHusbandService.deleteById(id)
    }
}
