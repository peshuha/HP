import { IHP, IPoint } from "@vkr/hp-lib"
import { HpMongoDocument } from "./hp.mongo"
import { PointDto } from "../point/point.dto"

export class HpDto implements IHP {

    constructor(
        // id
        public _id: string,
        // Ссылка на комнату
        public room_id: string,
        // Координаты 2D горячей области
        public polygon: PointDto[],
        // Те же самые координаты, но с разбивкой для случаем сцепки рисунка кольцом
        public segment?: PointDto[],
        // В каких условиях отображать
        public status?: string,

    ) {
    }

    // Request
    static fromIHP(hp: IHP) {
        console.log("HpDto.fromIHP", hp)
        return new this(
            hp._id,
            hp.room_id,
            hp.polygon,
            hp.segment
        )
    }

    // Request
    static fromJSON(hp: string) {
        const o = JSON.parse(hp) as IHP
        console.log("HpDto.fromJSON", o)
        return new this(
            o._id,
            o.room_id,
            o.polygon,
            o.segment
        )
    }

    // Response
    static fromHpMongo(hp: HpMongoDocument) {
        return new this(
            hp._id.toString(),
            hp.room_id,
            hp.polygon,
            hp.segment
        )
        
    }

}
