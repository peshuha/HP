import { Injectable } from '@angular/core';
import { IHP, IPoint, IProdnum } from '@vkr/hp-lib';
import { v4 as uuidv4 } from 'uuid'

@Injectable({
  providedIn: 'root'
})
export class HotPolygonService {

  hps: IHP[] = []

  constructor() { }

  getHP() {
    return this.hps
  }

  addHP(room_id: string, polygon: IPoint[], prodnums: IProdnum[]): IHP {

    const hp: IHP = {
      _id: uuidv4(),
      room_id, 
      polygon,
      status: ""
    }

    this.hps.push(hp)
    console.log("addHP()", this.hps)
    return hp
  }

  removeHP(id: string): void {
    this.hps = this.hps.filter(hp => hp._id !== id)
  }

  changeHP(hp: IHP): void {
    this.hps = this.hps.map(p => p._id === hp._id ? hp : p)
  }

}
