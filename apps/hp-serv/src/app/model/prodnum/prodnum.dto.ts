import { IProdnum } from "@vkr/hp-lib"
import { ProdnumMongo, ProdnumMongoDocument } from "./prodnum.mongo"

export class ProdnumDto implements IProdnum {

    constructor(
        // К какому юзеру привязываем 
        public userId: string, 
        // Код заказа
        public prodnum: string, 
        // Коментарий
        public comment: string, 
        // Текущее кол-во
        public qty: number, 
        // Какое кол-во требуется для поддержания
        public qtyKeep?: number, 
        // id
        public _id?: string, 
        // Если есть картинка 
        public img?: string, 
        // Прикрепрен ли к какой-то чувствительной области
        public hp_id?: string
    ) {
    }

    // Request
    static fromIProdnum(userid: string, p: IProdnum) {
        console.log("ProdnumDto.fromIProdnum", p)
        return new this(
            userid, 
            p.prodnum, 
            p.comment, 
            p.qty || 0, 
            p.qtyKeep, 
            p._id, 
            p.img, 
            p.hp_id
        )
    }

    // Response
    static fromProdnumMongo(p: ProdnumMongoDocument) {
        return new this(
            undefined, 
            p.prodnum, 
            p.comment, 
            p.qty, 
            p.qtyKeep, 
            p._id.toString(), 
            p.prodnum_img_id,
            p.hp_id
        )
        
    }

}
