import { HttpModule, Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { RentHusbandController } from './application/v1/RentHusbandController'
import RentHusbandService from './service/RentHusbandService'
import { RentHusband, RentHusbandSchema } from './domain/model/RentHusband'
import { RentHusbandRepository } from './repository/RentHusbandRepository'
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
        name: RentHusband.name,
        schema: RentHusbandSchema,
        collection: 'rent-husband',
        },
        ]),
    ],
    controllers: [RentHusbandController],
    providers: [RentHusbandService, RentHusbandRepository],
    })
export class AppModule {}
