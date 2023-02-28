import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty, IsDateString } from 'class-validator'

export class CreateRentHusbandDTO {
    @ApiProperty({
        example: 'Leonardo Silva Nascimento',
        description: 'Name of Rent Husband',
        type: String,
    })
    @IsNotEmpty()
    @IsString()
    nameHusband: string

    @ApiProperty({
        example: 'Leonardo Silva Nascimento',
        description: 'Number document of Rent Husband',
        type: String,
    })
    @IsNotEmpty()
    @IsString()
    documentNumber: string

    @ApiProperty({
        example: 'Leonardo Silva Nascimento',
        description: 'Email of Rent Husband',
        type: String,
    })
    @IsNotEmpty()
    @IsString()
    email: string

    @ApiProperty({
        description:
            'The year, month and day of birth of the rent husband',
        example: '20/12/1995',
    })
    @IsNotEmpty()
    dateOfBirth: string

    @ApiProperty({
        example: 'Masculino',
        description: 'Persons gender',
        type: String,
    })
    @IsNotEmpty()
    @IsString()
    sex: string

    @ApiProperty({
        example: 'Brasil',
        description: 'Country of birth',
        type: String,
    })
    @IsNotEmpty()
    @IsString()
    naturalness: string

    @ApiProperty({
        example: 'Curitiba - PR',
        description: 'State and city of birth',
        type: String,
    })
    @IsNotEmpty()
    @IsString()
    birthplace: string

    @ApiProperty({
        example: 'List of specialtie',
        description: 'Professional specialties',
        type: Array,
    })
    @IsNotEmpty()
    @IsString()
    specialties: string

    @ApiProperty({
        example: 'Solteiro',
        description: 'Persons marital status',
        type: String,
    })
    @IsNotEmpty()
    @IsString()
    civilStatus: string

    @ApiProperty({
        example: '81490030',
        description: 'Postal code',
        type: String,
    })
    @IsNotEmpty()
    @IsString()
    zipCode: string

    @ApiProperty({
        example: 'PR',
        description: 'State of the country',
        type: String,
    })
    @IsNotEmpty()
    @IsString()
    state: string

    @ApiProperty({
        example: 'Curitiba',
        description: 'State city',
        type: String,
    })
    @IsNotEmpty()
    @IsString()
    city: string

    @ApiProperty({
        example: 'Campo de Santana',
        description: 'City ​neighborhood',
        type: String,
    })
    @IsNotEmpty()
    @IsString()
    neighborhood: string

    @ApiProperty({
        example: 'Rua Angêlo Tozim',
        description: 'Neighborhood street',
        type: String,
    })
    @IsNotEmpty()
    @IsString()
    street: string

    @ApiProperty({
        example: '200',
        description: 'House number',
        type: String,
    })
    @IsNotEmpty()
    @IsString()
    number: string

    @ApiProperty({
        example: 'Bloco 4, Apê 303',
        description: 'Address complement',
        type: String,
    })
    @IsNotEmpty()
    @IsString()
    complement: string

    @ApiProperty({
        example: '2022-07-15T16:08:24.749+00:00',
        description: 'Registration date',
        type: Date,
    })
    @IsNotEmpty()
    @IsDateString()
    registerDate?: Date = null

    @ApiProperty({
        example: '2022-07-15T16:08:24.749+00:00',
        description: 'Last modified date',
        type: Date,
    })
    @IsNotEmpty()
    @IsDateString()
    lastModifyDate?: Date = null
}
