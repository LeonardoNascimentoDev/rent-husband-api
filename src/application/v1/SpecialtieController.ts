import { Controller, Get } from '@nestjs/common'
import {
    ApiOkResponse,
    ApiOperation,
} from '@nestjs/swagger'
import { Specialtie } from 'src/domain/model/Specialtie'
import SpecialtieService from 'src/service/SpecialtieService'

@Controller('api/v1/specialtie')
export class SpecialtieController {
    constructor(private readonly specialtieService: SpecialtieService) {}

    @Get()
    @ApiOperation({ summary: 'Obter todas as especializações' })
    @ApiOkResponse({ description: 'Lista de retorno de todas as especializações' })
    async getAll(): Promise<Specialtie[]> {
        return this.specialtieService.getAll()
    }
}
