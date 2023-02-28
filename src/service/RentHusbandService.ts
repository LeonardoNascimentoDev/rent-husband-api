import { Injectable } from '@nestjs/common'
import { CreateRentHusbandDTO } from '../domain/dto/CreateRentHusbandDTO'
import { RentHusband } from '../domain/model/RentHusband'
import { RentHusbandRepository } from '../repository/RentHusbandRepository'

@Injectable()
export default class RentHusbandService {
    constructor(private readonly repository: RentHusbandRepository) {}

    async getAll(): Promise<RentHusband[]> {
        const response = await this.repository.findAll()
        return response
    }

    async findByRentHusbandById(id: string): Promise<RentHusband> {
        const response = await this.repository.findByRentHusbandById(id)
        return response
    }

    async executeSave(payload: CreateRentHusbandDTO): Promise<RentHusband> {
        const response = (await this.repository.create(payload)) as RentHusband
        return response
    }

    async executeUpdate(id: string, payload: CreateRentHusbandDTO): Promise<RentHusband> {
        const rentHusband = await this.repository.update(id, payload)
        return rentHusband
    }

    async deleteById(id: string): Promise<RentHusband> {
        const response = await this.repository.deleteById(id)
        return response
    }
}
