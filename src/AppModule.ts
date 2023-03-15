import { HttpModule, Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UserController } from './application/v1/UserController'
import UserService from './service/UserService'
import { User, UserSchema } from './domain/model/User'
import { UserRepository } from './repository/UserRepository'
import * as dotenv from 'dotenv'
import { SpecialtieController } from './application/v1/SpecialtieController'
import SpecialtieService from './service/SpecialtieService'
import { SpecialtieRepository } from './repository/SpecialtieRepository'
import { Specialtie, SpecialtieSchema } from './domain/model/Specialtie'
dotenv.config()
@Module({
    imports: [
    HttpModule,

    MongooseModule.forRoot(process.env.DATABASE_URL, {
        dbName: 'rent-husbands-db',
        }),

    MongooseModule.forFeature([
        {
        name: User.name,
        schema: UserSchema,
        collection: 'user',
        },
        {
        name: Specialtie.name,
        schema: SpecialtieSchema,
        collection: 'user',
        },
        ]),
    ],
    controllers: [UserController, SpecialtieController],
    providers: [UserService, UserRepository, SpecialtieService, SpecialtieRepository],
    })
export class AppModule {}
