import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Specialtie } from './Specialtie'

@Schema()
export class User {
    @Prop({ name: 'name', nullable: true })
    name: string

    @Prop({ name: 'cpfCnpj', nullable: true })
    cpfCnpj: string

    @Prop({ name: 'email', nullable: true })
    email: string

    @Prop({ name: 'dateOfBirth', nullable: true })
    dateOfBirth?: string

    @Prop({ name: 'sex', nullable: true })
    sex?: string

    @Prop({ name: 'naturalness', nullable: true })
    naturalness: string
    
    @Prop({type: Array , default: [Specialtie] })
    specialties: Specialtie[]

    @Prop({ name: 'zipCode', nullable: true })
    zipCode: string

    @Prop({ name: 'state', nullable: true })
    state: string

    @Prop({ name: 'city', nullable: true })
    city: string

    @Prop({ name: 'neighborhood', nullable: true })
    neighborhood: string

    @Prop({ name: 'street', nullable: true })
    street: string

    @Prop({ name: 'number', nullable: true })
    number: string

    @Prop({ name: 'complement', nullable: true })
    complement: string

    @Prop({ name: 'actived', nullable: true })
    actived?: boolean = true

    @Prop({ nullable: true })
    registerDate?: Date

    @Prop({ nullable: true })
    lastModifyDate?: Date

    _id?: string
}

export const UserSchema = SchemaFactory.createForClass(User)
