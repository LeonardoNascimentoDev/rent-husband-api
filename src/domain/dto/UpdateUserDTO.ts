import { IsNotEmpty, IsString, IsDateString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class UpdateUserDTO {
    @ApiProperty({
        example: 'Leonardo Silva Nascimento',
        description: 'Name of Rent Husband',
        type: String,
    })
    @IsNotEmpty()
    @IsString()
    name: string

    @ApiProperty({
        example: '12312323',
        description: 'Number document of Rent Husband',
        type: String,
    })
    @IsNotEmpty()
    @IsString()
    cpfCnpj: string

    @ApiProperty({
        example: 'teste@teste.com',
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
    @IsString()
    sex?: string

    @ApiProperty({
        example: 'Brasil',
        description: 'Country of birth',
        type: String,
    })
    @IsNotEmpty()
    @IsString()
    naturalness: string

    @ApiProperty({
        example: 'List of specialtie',
        description: 'Professional specialties',
        type: String,
    })
    @IsNotEmpty()
    @IsString()
    specialties: string

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
