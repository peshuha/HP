import { Controller, Delete, Post, Put } from '@nestjs/common';
import { ViewService } from './view.service';
import { ViewDto } from '../../model/view/view.dto';
import { IView } from '@vkr/hp-lib';
import { Public } from '../auth/auth.public';

@Public()
@Controller('view')
export class ViewController {
    constructor(
        private svc: ViewService
    ) {}

    @Post()
    async add(vw: IView) {
        const o = await this.svc.add(ViewDto.fromIView(vw))
        return ViewDto.fromViewMongo(o)
    } 

    @Put()
    async change(vw: IView) {
        return this.svc.change(ViewDto.fromIView(vw))
    }

    @Delete()
    async remove(vw: IView) {
        return this.svc.remove(ViewDto.fromIView(vw))
    }
}
