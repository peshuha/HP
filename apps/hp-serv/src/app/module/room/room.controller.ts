import { Controller, Delete, Patch, Post, Put } from '@nestjs/common';
import { RoomService } from './room.service';
import { IRoom } from '@vkr/hp-lib';
import { RoomDto } from '../../model/room/room.dto';

@Controller('room')
export class RoomController {

    constructor(
        private svc: RoomService
    ){}

    @Post()
    async add(room: IRoom) {
        const o = await this.svc.add(RoomDto.fromIRoom(room))
        return RoomDto.fromRoomDocument(o)
    }

    @Put()
    async change(room: IRoom) {
        return this.svc.change(RoomDto.fromIRoom(room))
    }

    @Delete()
    async delete(room: IRoom) {
        return this.svc.remove(RoomDto.fromIRoom(room))
    }
}
