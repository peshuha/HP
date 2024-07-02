import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomMongo, RoomMongoSchema } from '../../model/room/room.mongo';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: RoomMongo.name, schema: RoomMongoSchema }],
      'room'
    ),
  ],  
  providers: [RoomService],
  controllers: [RoomController],
})
export class RoomModule {}
