import { Module } from '@nestjs/common';
import { HpService } from './hp.service';
import { HpController } from './hp.controller';
import { HpMongo, HpMongoSchema } from '../../model/hp/hp.mongo';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: HpMongo.name, schema: HpMongoSchema }],
      'room'
    ),
  ],  providers: [HpService],
  controllers: [HpController],
})
export class HpModule {}
