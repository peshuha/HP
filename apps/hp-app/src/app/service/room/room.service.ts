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

  getAll() {
    return this.svc.getAll()
  }

  add(room: IRoom, img: File) {
    return this.svc.add(room, img)
  }
}
