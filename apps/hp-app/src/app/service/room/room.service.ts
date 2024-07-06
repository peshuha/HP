import { Injectable } from '@angular/core';
import { RoomRestService } from './room-rest.service';
import { IRoom } from '@vkr/hp-lib';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(
    private svc: RoomRestService
  ) { }

  get_all() {
    return this.svc.get_all()
  }

  add(room: IRoom) {
    return this.svc.add(room)
  }
}
