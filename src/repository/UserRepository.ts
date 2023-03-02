import {
    Injectable,
    InternalServerErrorException,
    NotFoundException,
    Logger,
    ConflictException,
    // BadRequestException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User } from '../domain/model/User'
// import { DateUtils } from '../utils/date-utils'

@Injectable()
export class UserRepository {
    private logger = new Logger('Users')

    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async findAll(): Promise<User[]> {
        if (!(await this.userModel.find())) {
            throw new NotFoundException()
        }
        try {
            return await this.userModel.find().sort({ goal: -1 })
        } catch (err) {
            this.logger.error('Error when looking for rent husbands', err.stack)
            throw new InternalServerErrorException()
        }
    }

    async findByRentHusbandById(id: string): Promise<User> {
        // Validação caso o ID não exista
        try {
            await this.userModel.findById(id).exec()
        } catch (err) {
            if (err.kind === 'ObjectId') {
                throw new NotFoundException('No husband was found for this id!')
            }
            this.logger.error('Error updating rent husband', err.stack)
            throw new InternalServerErrorException()
        }

        const rentHusband = await this.userModel.findById(id).exec()
        return rentHusband
    }

    async findRentHusband(payload: User): Promise<User> {
        const response = await this.userModel.findOne({
            cpfCnpj: payload.cpfCnpj,
            email: payload.email,
        })
        return response
    }

    async create(payload: User) {
        if (await this.findRentHusband(payload)) {
            throw new ConflictException('Rent Husband already registered!')
        } else {
            const date = new Date(
                new Date().valueOf() - new Date().getTimezoneOffset() * 60000,
            )
            payload.registerDate = date
            payload.lastModifyDate = date
            const rentHusbandCreate = new this.userModel(payload)
            return rentHusbandCreate.save()
        }
    }

    async update(id: string, rentHusband: User): Promise<User> {
        // Validação caso o ID não exista
        try {
            await this.userModel.findOne({
                _id: id,
            })
        } catch (err) {
            if (err.kind === 'ObjectId') {
                throw new NotFoundException('No husband was found for this id!')
            }
            this.logger.error('Error updating rent husband', err.stack)
            throw new InternalServerErrorException()
        }

        // Validação caso já exista o cadastro
        if (await this.findRentHusband(rentHusband)) {
            throw new ConflictException('Rent husband already registered!')
        }
        const date = new Date()
        rentHusband.lastModifyDate = new Date(
            date.valueOf() - date.getTimezoneOffset() * 60000,
        )
        await this.userModel.findByIdAndUpdate(id, rentHusband)
        // Objeto atualizado
        const rentHusbandUpdate = await this.userModel.findOne({ _id: id })
        return rentHusbandUpdate
    }

    async deleteById(id: string) {
        // Validação caso o ID não exista
        try {
            await this.userModel.findOne({
                _id: id,
            })
        } catch (err) {
            if (err.kind === 'ObjectId') {
                throw new NotFoundException('No husband was found for this id!!')
            }
            this.logger.error('Error updating rent husband', err.stack)
            throw new InternalServerErrorException()
        }

        const rentHusbandDeleted = this.userModel
            .findOneAndDelete({ _id: id })
            .exec()
        return (await rentHusbandDeleted).remove()
    }
}
