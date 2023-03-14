import {
    Injectable,
    InternalServerErrorException,
    NotFoundException,
    Logger,
    ConflictException,
    BadRequestException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User } from '../domain/model/User'
import { ValidateDocument } from '../utils/validate-document'
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
            this.logger.error('Erro ao procurar usuários', err.stack)
            throw new InternalServerErrorException()
        }
    }

    async findByUserById(id: string): Promise<User> {
        // Validação caso o ID não exista
        try {
            await this.userModel.findById(id).exec()
        } catch (err) {
            if (err.kind === 'ObjectId') {
                throw new NotFoundException('Nenhum usuário foi encontrado para este id!')
            }
            this.logger.error('Erro ao atualizar o usuário', err.stack)
            throw new InternalServerErrorException()
        }

        const user = await this.userModel.findById(id).exec()
        return user
    }

    async findUser(payload: User): Promise<User> {
        const response = await this.userModel.findOne({
            cpfCnpj: payload.cpfCnpj,
        })
        return response
    }

    async create(payload: User) {
        if (await this.findUser(payload)) {
            throw new ConflictException('Usuário já cadastrado!')
        } else {
            const validateDocument = new ValidateDocument()
            if(payload.cpfCnpj.length === 11){
                if(validateDocument.isValidCPF(payload.cpfCnpj)){
                    const date = new Date(
                        new Date().valueOf() - new Date().getTimezoneOffset() * 60000,
                    )
                    payload.registerDate = date
                    payload.lastModifyDate = date
                    const userCreate = new this.userModel(payload)
                    return userCreate.save()
                }
            }else if(payload.cpfCnpj.length === 14){
              if(validateDocument.cnpjValidation(payload.cpfCnpj)){
                const date = new Date(
                    new Date().valueOf() - new Date().getTimezoneOffset() * 60000,
                )
                    payload.registerDate = date
                    payload.lastModifyDate = date
                    const userCreate = new this.userModel(payload)
                    return userCreate.save()
              }
            }
            throw new BadRequestException('CNPJ ou CPF informado inválido!')
        }
    }

    async update(id: string, user: User): Promise<User> {
        // Validação caso já exista o cadastro
        const userFinded = await this.findUser(user)
        if (!userFinded || userFinded == null) {
            throw new NotFoundException('Nenhum usuário foi encontrado para este id!')
        } else if(userFinded._id.toString() != id) {
            throw new ConflictException('Usuário já registrado com este documento!')
        }
        const date = new Date()
        user.lastModifyDate = new Date(
            date.valueOf() - date.getTimezoneOffset() * 60000,
        )
        await this.userModel.findByIdAndUpdate(id, user)
        // Objeto atualizado
        const userUpdate = await this.userModel.findOne({ _id: id })
        return userUpdate
    }

    async deleteById(id: string) {
        // Validação caso o ID não exista
        try {
            await this.userModel.findOne({
                _id: id,
            })
        } catch (err) {
            if (err.kind === 'ObjectId') {
                throw new NotFoundException('Nenhum usuário foi encontrado para este id!')
            }
            this.logger.error('Erro ao deletar o usuário', err.stack)
            throw new InternalServerErrorException()
        }
        return this.userModel.findByIdAndUpdate(id, { actived: false })
    }
}
