import { Injectable} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RoomDto } from '../../model/room/room.dto';
import { RoomMongo } from '../../model/room/room.mongo';


@Injectable()
export class RoomService {
    constructor(
        @InjectModel(RoomMongo.name, 'room') private md: Model<RoomMongo>,
    ) {}

    async get(user_id: string) {
        return this.md.find({user_id})
    }

    async get_room(user_id: string, room_id: string) {
        
        // Сначала получаем комнату
        const o = await this.md.findById(room_id)

        // Проверяем на пренадлежность юзеру
        if(o._id.toString() !== user_id){
            return
        }

        return RoomDto.fromRoomDocument(o)
    }

    async get_img(user_id: string, room_id: string) {

        // Сначала получаем комнату
        const o = await this.md.findById(room_id)
 
        // Проверяем на пренадлежность юзеру
        if(o.user_id.toString() !== user_id){
            return null
        }

        // Возвращаем картинку
        return Buffer.from(o.img, "base64")
    }

    add(room: RoomDto, img: Express.Multer.File) {
        const o = new this.md(room)
        o.img = img.buffer.toString("base64")
        return o.save()
    }

    change(room: RoomDto) {
        return this.md.findByIdAndUpdate(room._id, room, {new: true})
    }

    remove(room: RoomDto) {
        return this.md.findByIdAndDelete(room._id)
    }
}
