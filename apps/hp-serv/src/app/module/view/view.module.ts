import { Module } from '@nestjs/common';
import { ViewService } from './view.service';
import { ViewController } from './view.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ViewMongo, ViewMongoSchema } from '../../model/view/view.mongo';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: ViewMongo.name, schema: ViewMongoSchema }],
      'room'
    ),
  ],  
  providers: [ViewService],
  controllers: [ViewController],
})
export class ViewModule {}
