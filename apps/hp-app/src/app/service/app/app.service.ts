import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  room_id = ""

  constructor() { }

  get RoomId() {
    return this.room_id
  }

  set RoomId(room_id: string) {
    this.room_id = room_id
  }
}
