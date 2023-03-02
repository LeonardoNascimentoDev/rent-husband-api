import { Injectable } from '@nestjs/common'
import { CreateUserDTO } from '../domain/dto/CreateUserDTO'
import { User } from '../domain/model/User'
import { UserRepository } from '../repository/UserRepository'

@Injectable()
export default class UserService {
    constructor(private readonly repository: UserRepository) {}

    async getAll(): Promise<User[]> {
        const response = await this.repository.findAll()
        return response
    }

    async findByRentHusbandById(id: string): Promise<User> {
        const response = await this.repository.findByRentHusbandById(id)
        return response
    }

    async executeSave(payload: CreateUserDTO): Promise<User> {
        const response = (await this.repository.create(payload)) as User
        return response
    }

    async executeUpdate(id: string, payload: CreateUserDTO): Promise<User> {
        const rentHusband = await this.repository.update(id, payload)
        return rentHusband
    }

    async deleteById(id: string): Promise<User> {
        const response = await this.repository.deleteById(id)
        return response
    }
}
