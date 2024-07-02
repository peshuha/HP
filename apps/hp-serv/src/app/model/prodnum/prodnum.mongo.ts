import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { IProdnum } from '@vkr/hp-lib';
import { HydratedDocument } from 'mongoose';

@Schema({collection: "prodnum"})
export class ProdnumMongo implements IProdnum{
    

    // К какому юзеру привязываем 
    @Prop()
    user_id: string

    // Код заказа
    @Prop()
    prodnum: string

    // Коментарий
    @Prop()
    comment: string

    // Текущее кол-во
    @Prop()
    qty: number

    // Какое кол-во требуется для поддержания
    @Prop()
    qtyKeep?: number

    // Прикрепрен ли к какой-то чувствительной области
    @Prop()
    hp_id?: string

    // Если есть картинка 
    @Prop()
    prodnum_img_id?: string
}

export type ProdnumMongoDocument = HydratedDocument<ProdnumMongo>;
export const ProdnumMongoSchema = SchemaFactory.createForClass(ProdnumMongo);
