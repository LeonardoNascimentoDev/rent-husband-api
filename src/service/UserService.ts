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

    async findByUserById(id: string): Promise<User> {
        const response = await this.repository.findByUserById(id)
        return response
    }

    async executeCreateUser(payload: CreateUserDTO): Promise<User> {
        const response = (await this.repository.create(payload)) as User
        return response
    }

    async executeUpdate(id: string, payload: CreateUserDTO): Promise<User> {
        const user = await this.repository.update(id, payload)
        return user
    }

    async deleteById(id: string): Promise<User> {
        const response = await this.repository.deleteById(id)
        return response
    }
}
