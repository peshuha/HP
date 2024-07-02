import { IView, ViewType } from "@vkr/hp-lib";
import { ViewMongoDocument } from "./view.mongo";

export class ViewDto implements IView {

    constructor(
        public room_id: string, 
        public tp: ViewType, 
        public options?: any,
        public _id?: string 
    ){}

    // Request
    static fromIView(vw: IView) {
        return new this (
            vw.room_id,
            vw.tp,
            vw.options,
            vw._id
        )
    }

    // Response
    static fromViewMongo(vw: ViewMongoDocument) {
        return new this (
            vw.room_id,
            vw.tp as ViewType,
            vw.options,
            vw._id.toString()
        )
    }
    
}