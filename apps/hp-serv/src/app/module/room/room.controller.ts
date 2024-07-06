import { Controller, Delete, Get, Patch, Post, Put, UploadedFile, UseInterceptors, Request, Query, Param, Body, Response } from '@nestjs/common';
import { RoomService } from './room.service';
import { IRoom } from '@vkr/hp-lib';
import { RoomDto } from '../../model/room/room.dto';
import { Public } from '../auth/auth.public';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors/file.interceptor';
import { Express } from 'express'
import { UserId } from '../../decorator/userid';
import { Readable } from 'stream';

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

    @Get("/img/:id")
    async getImage(@Response() res, @UserId() user, @Param("id") room_id) {
        console.log("RoomController::getImage", room_id)

        // Получаем картинку
        const img: Buffer | null = await this.svc.get_img(user, room_id)
        if(!img)
            return

        console.log("RoomController::getImage.img", img)
        // Возвращаем ее в поток
        res.set({
            'Content-Type': 'image/*',
            'Content-Length': img.length,
        });
        
        const stream = new Readable();

        stream.push(img);
        stream.push(null);
        
        return stream.pipe(res)
    }

    @Get(":id")
    async getRoom(@UserId() user, @Param("id") room_id) {
        console.log("RoomController::getRoom", room_id)
        return this.svc.get_room(user, room_id)
    }

    @Post()
    @UseInterceptors(FileInterceptor('img'))
    async add(@UserId() user, @Body() room: IRoom, @UploadedFile() img: Express.Multer.File) {
        console.log("RoomController::add", user, room, img)
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
