import { Body, Controller, Delete, Patch, Post, Put } from '@nestjs/common';
import { IProdnum } from '@vkr/hp-lib';
import { ProdnumService } from './prodnum.service';
import { ProdnumDto } from '../../model/prodnum/prodnum.dto';
import { Public } from '../auth/auth.public';

@Public()
@Controller('prodnum')
export class ProdnumController {

    constructor(
        private svc: ProdnumService
    ){}

    @Post()
    async add(@Body() p: IProdnum) {
        const o = await this.svc.add(ProdnumDto.fromIProdnum("", p))
        console.log("ProdnumController::add", o.toObject())
        return ProdnumDto.fromProdnumMongo(o)
    }

    @Put()
    async change(@Body() p: IProdnum) {
        const o = await this.svc.change(ProdnumDto.fromIProdnum("", p))
        console.log("ProdnumController::change", o.toObject())
        return ProdnumDto.fromProdnumMongo(o)
    }

    @Delete()
    async remove(@Body() p: IProdnum) {
        const o = await this.svc.remove(ProdnumDto.fromIProdnum("", p))
        console.log("ProdnumController::change", o.toObject())
        return ProdnumDto.fromProdnumMongo(o)
    }
}
