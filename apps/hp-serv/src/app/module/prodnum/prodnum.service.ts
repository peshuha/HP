import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProdnumMongo } from '../../model/prodnum/prodnum.mongo';
import { ProdnumDto } from '../../model/prodnum/prodnum.dto';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

@Injectable()
export class ProdnumService {
    constructor(
        @InjectModel(ProdnumMongo.name, 'room') private md: Model<ProdnumMongo>,
    ) {}

    async add(prodnum: ProdnumDto) {
        const o = new this.md(prodnum)
        return o.save()
    }

    change(prodnum: ProdnumDto) {
        return this.md.findByIdAndUpdate(prodnum._id, prodnum, {new: true})
    }

    remove(prodnum: ProdnumDto) {
        return this.md.findByIdAndDelete(prodnum._id)
    }
}
