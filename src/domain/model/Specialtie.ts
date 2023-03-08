import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema()
export class Specialtie {
    @Prop({ name: 'id', nullable: true })
    id: number

    @Prop({ name: 'name', nullable: true })
    name: string
}

export const SpecialtieSchema = SchemaFactory.createForClass(Specialtie)
