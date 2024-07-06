import { Controller, Delete, Get, Patch, Post, Put, UploadedFile, UseInterceptors, Request, Query, Param } from '@nestjs/common';
import { RoomService } from './room.service';
import { IRoom } from '@vkr/hp-lib';
import { RoomDto } from '../../model/room/room.dto';
import { Public } from '../auth/auth.public';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors/file.interceptor';
import { Express } from 'express'
import { UserId } from '../../decorator/userid';

// @Public()
@Controller('room')
export class RoomController {

    constructor(
        private svc: RoomService
    ){}

    @Get()
    async getAll(@UserId() user) {
        return this.svc.get(user)
    }

    @Get(":id")
    async getRoom(@UserId() user, @Param(":id") room_id) {
        return this.svc.get_room(user, room_id)
    }

    @Post()
    @UseInterceptors(FileInterceptor('img'))
    async add(@UserId() user, room: IRoom, @UploadedFile() img: Express.Multer.File) {
        const o = await this.svc.add(RoomDto.fromIRoom(user, room), img)
        return RoomDto.fromRoomDocument(o)
    }

    @Put()
    async change(@UserId() user, room: IRoom) {
        return this.svc.change(RoomDto.fromIRoom(user, room))
    }

    @Delete()
    async delete(@UserId() user, room: IRoom) {
        return this.svc.remove(RoomDto.fromIRoom(user, room))
    }
}
