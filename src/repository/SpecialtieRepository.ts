import {
    Injectable,
    InternalServerErrorException,
    NotFoundException,
    Logger,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Specialtie } from 'src/domain/model/Specialtie'

@Injectable()
export class SpecialtieRepository {
    private logger = new Logger('Specialtie')

    constructor(@InjectModel(Specialtie.name) private specialtieModel: Model<Specialtie>) {}

    async findAll(): Promise<Specialtie[]> {
        if (!(await this.specialtieModel.find())) {
            throw new NotFoundException()
        }
        try {
            return await this.specialtieModel.find().sort({ goal: -1 })
        } catch (err) {
            this.logger.error('Erro ao procurar especialização', err.stack)
            throw new InternalServerErrorException()
        }
    }
}