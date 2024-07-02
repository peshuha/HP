import { Body, Controller, Delete, Patch, Post, Put, Req } from '@nestjs/common';
import { HpService } from './hp.service';
import { IHP } from '@vkr/hp-lib';
import { HpDto } from '../../model/hp/hp.dto';
import { Public } from '../auth/auth.public';

@Public()
@Controller('hp')
export class HpController {

    constructor(
        private svc: HpService
    ){}

    @Post()
    async add(@Body() hp: IHP) {
        const o = await this.svc.add(HpDto.fromIHP(hp))
        return HpDto.fromHpMongo(o)
    }

    // @Post("2")
    // async add2(@Req() req: Request) {
    //     console.log("add2", hp, JSON.parse(req.js))
    //     const o = await this.svc.add(HpDto.fromJSON(hp))
    //     return HpDto.fromHpMongo(o)
    // }

    @Put()
    async change(@Body() hp: IHP) {
        this.svc.change(HpDto.fromIHP(hp))
    }

    @Delete()
    async remove(@Body() hp: IHP) {
        this.svc.remove(HpDto.fromIHP(hp))
    }


}
