import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ViewMongo } from '../../model/view/view.mongo';
import { ViewDto } from '../../model/view/view.dto';

@Injectable()
export class ViewService {
    
    constructor(
        @InjectModel(ViewMongo.name, 'room') private md: Model<ViewMongo>,
    ) {}

    add(vw: ViewDto) {
        const o = new this.md(vw)
        return o.save()
    }

    change(vw: ViewDto) {
        return this.md.findByIdAndUpdate(vw._id, vw, {new: true})
    }

    remove(vw: ViewDto) {
        return this.md.findByIdAndDelete(vw._id)
    }

}
