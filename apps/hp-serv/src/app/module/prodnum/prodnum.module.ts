import { Module } from '@nestjs/common';
import { ProdnumService } from './prodnum.service';
import { ProdnumMongo, ProdnumMongoSchema } from '../../model/prodnum/prodnum.mongo';
import { MongooseModule } from '@nestjs/mongoose';
import { ProdnumController } from './prodnum.controller';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: ProdnumMongo.name, schema: ProdnumMongoSchema }],
      'room'
    ),
  ],
  providers: [ProdnumService],
  controllers: [ProdnumController],
})
export class ProdnumModule {}
