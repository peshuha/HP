import { Injectable } from '@angular/core';
import { IHP, IPoint, IProdnum } from '@vkr/hp-lib';
import { v4 as uuidv4 } from 'uuid'
import { HPRestService } from './hp-rest.service';

@Injectable({
  providedIn: 'root'
})
export class HPService {

  hps: IHP[] = []

  constructor(
    private rest: HPRestService
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
