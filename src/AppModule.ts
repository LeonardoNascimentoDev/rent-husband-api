import { HttpModule, Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UserController } from './application/v1/UserController'
import UserService from './service/UserService'
import { User, UserSchema } from './domain/model/User'
import { UserRepository } from './repository/UserRepository'
import * as dotenv from 'dotenv'
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
        ]),
    ],
    controllers: [UserController],
    providers: [UserService, UserRepository],
    })
export class AppModule {}
