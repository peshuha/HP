import { Injectable } from '@angular/core';
import { IHP, IPoint, IProdnum } from '@vkr/hp-lib';
import { v4 as uuidv4 } from 'uuid'
import { HotPolygonRestService } from './hot-polygon-rest.service';

@Injectable({
  providedIn: 'root'
})
export class HotPolygonService {

  hps: IHP[] = []

  constructor(
    private rest: HotPolygonRestService
  ) { }

  get(room_id: string) {
    return this.rest.get(room_id)
  }

  add(hp: IHP){
    return this.rest.add(hp)
  }

  delete(hp: IHP) {
    this.rest.delete(hp)
  }

  change(hp: IHP) {
    this.rest.change(hp)
  }

}
