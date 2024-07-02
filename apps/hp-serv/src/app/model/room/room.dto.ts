import { IRoom } from "@vkr/hp-lib";
import { RoomMongoDocument } from "./room.mongo";

export class RoomDto implements IRoom {

    constructor(
        public user_id: string,
        public img_id: string, 
        public _id?: string
    ){}

    // Request
    static fromIRoom(user_id: string, room: IRoom) {
        return new this (
            user_id,
            room.img_id,
            room._id
        )
    }

    // Response
    static fromRoomDocument(room: RoomMongoDocument) {
        return new this (
            undefined,  // user_id
            room.img_id,
            room._id.toString()
        )
    }
}