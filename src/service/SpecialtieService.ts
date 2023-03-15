import { Injectable } from '@nestjs/common'
import { Specialtie } from 'src/domain/model/Specialtie'
import { SpecialtieRepository } from 'src/repository/SpecialtieRepository'

@Injectable()
export default class SpecialtieService {
    constructor(private readonly repository: SpecialtieRepository) {}

    async getAll(): Promise<Specialtie[]> {
        const response = await this.repository.findAll()
        return response
    }
}
