import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { HpMongo } from '../../model/hp/hp.mongo';
import { InjectModel } from '@nestjs/mongoose';
import { HpDto } from '../../model/hp/hp.dto';

@Injectable()
export class HpService {
    constructor(
        @InjectModel(HpMongo.name, 'room') private md: Model<HpMongo>,
    ) {}   

    get(room_id: string) {
        return this.md.find({room_id})
    }
    
    add(hp: HpDto) {
        const o = new this.md(hp)
        return o.save()
    }

    change(hp:HpDto) {
        return this.md.findByIdAndUpdate(hp._id, hp, {new: true})
    }

    remove(hp: HpDto) {
        return this.md.findByIdAndDelete(hp._id)
    }
}
