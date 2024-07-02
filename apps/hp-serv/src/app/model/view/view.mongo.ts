import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { IView, ViewType } from '@vkr/hp-lib';
import { HydratedDocument } from 'mongoose';

@Schema({collection: "view"})
export class ViewMongo { // implements IView

    // К какой комнате привязываемся
    @Prop()
    room_id: string;

    // Тип отображения
    @Prop()
    tp: string; //ViewType;

    // Параметры отображения (в зависимости от типа)
    @Prop()
    options?: string; //any;
    
}

export type ViewMongoDocument = HydratedDocument<ViewMongo>;
export const ViewMongoSchema = SchemaFactory.createForClass(ViewMongo);
