import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { IHP, IPoint } from '@vkr/hp-lib';
import { HydratedDocument } from 'mongoose';

@Schema({collection: "hp"})
export class HpMongo implements IHP{
    
    // Ссылка на комнату
    @Prop()
    public room_id: string

    // Координаты 2D горячей области
    @Prop()
    public polygon: [IPoint]

    // Те же самые координаты, но с разбивкой для случаем сцепки рисунка кольцом
    @Prop()
    public segment?: [IPoint]
}

export type HpMongoDocument = HydratedDocument<HpMongo>;
export const HpMongoSchema = SchemaFactory.createForClass(HpMongo);
