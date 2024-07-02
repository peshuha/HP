import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IRoom } from '@vkr/hp-lib';
import { HydratedDocument } from 'mongoose';

@Schema({collection: "room"})
export class RoomMongo implements IRoom{

    // К какому юзеру привязываем 
    @Prop()
    user_id: string

    // Если есть картинка 
    @Prop()
    img_id: string
}

export type RoomMongoDocument = HydratedDocument<RoomMongo>;
export const RoomMongoSchema = SchemaFactory.createForClass(RoomMongo);
