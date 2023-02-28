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
import { RentHusband } from '../domain/model/RentHusband'
// import { DateUtils } from '../utils/date-utils'

@Injectable()
export class RentHusbandRepository {
    private logger = new Logger('RentHusbands')

    constructor(@InjectModel(RentHusband.name) private rentHusbandModel: Model<RentHusband>) {}

    async findAll(): Promise<RentHusband[]> {
        if (!(await this.rentHusbandModel.find())) {
            throw new NotFoundException()
        }
        try {
            return await this.rentHusbandModel.find().sort({ goal: -1 })
        } catch (err) {
            this.logger.error('Error when looking for rent husbands', err.stack)
            throw new InternalServerErrorException()
        }
    }

    async findByRentHusbandById(id: string): Promise<RentHusband> {
        // Validação caso o ID não exista
        try {
            await this.rentHusbandModel.findById(id).exec()
        } catch (err) {
            if (err.kind === 'ObjectId') {
                throw new NotFoundException('No husband was found for this id!')
            }
            this.logger.error('Error updating rent husband', err.stack)
            throw new InternalServerErrorException()
        }

        const rentHusband = await this.rentHusbandModel.findById(id).exec()
        return rentHusband
    }

    async findRentHusband(payload: RentHusband): Promise<RentHusband> {
        const response = await this.rentHusbandModel.findOne({
            documentNumber: payload.documentNumber,
            email: payload.email,
        })
        return response
    }

    async create(payload: RentHusband) {
        if (await this.findRentHusband(payload)) {
            throw new ConflictException('Rent Husband already registered!')
        } else {
            const date = new Date(
                new Date().valueOf() - new Date().getTimezoneOffset() * 60000,
            )
            payload.registerDate = date
            payload.lastModifyDate = date
            const rentHusbandCreate = new this.rentHusbandModel(payload)
            return rentHusbandCreate.save()
        }
    }

    async update(id: string, rentHusband: RentHusband): Promise<RentHusband> {
        // Validação caso o ID não exista
        try {
            await this.rentHusbandModel.findOne({
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
        await this.rentHusbandModel.findByIdAndUpdate(id, rentHusband)
        // Objeto atualizado
        const rentHusbandUpdate = await this.rentHusbandModel.findOne({ _id: id })
        return rentHusbandUpdate
    }

    async deleteById(id: string) {
        // Validação caso o ID não exista
        try {
            await this.rentHusbandModel.findOne({
                _id: id,
            })
        } catch (err) {
            if (err.kind === 'ObjectId') {
                throw new NotFoundException('No husband was found for this id!!')
            }
            this.logger.error('Error updating rent husband', err.stack)
            throw new InternalServerErrorException()
        }

        const rentHusbandDeleted = this.rentHusbandModel
            .findOneAndDelete({ _id: id })
            .exec()
        return (await rentHusbandDeleted).remove()
    }
}
