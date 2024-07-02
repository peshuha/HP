import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RoomDto } from '../../model/room/room.dto';
import { RoomMongo } from '../../model/room/room.mongo';

@Injectable()
export class RoomService {
    constructor(
        @InjectModel(RoomMongo.name, 'room') private md: Model<RoomMongo>,
    ) {}

    add(room: RoomDto) {
        const o = new this.md(room)
        return o.save()
    }

    change(room: RoomDto) {
        return this.md.findByIdAndUpdate(room._id, room, {new: true})
    }

    remove(room: RoomDto) {
        return this.md.findByIdAndDelete(room._id)
    }
}
