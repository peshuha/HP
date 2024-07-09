import { 
    Prop, 
    Schema, 
    SchemaFactory
    
} from '@nestjs/mongoose';
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

    // Состояние активной области
    @Prop()
    public status?: string;

    // Комментарий
    @Prop()
    public comment?: string
}

export type HpMongoDocument = HydratedDocument<HpMongo>;
export const HpMongoSchema = SchemaFactory.createForClass(HpMongo);
