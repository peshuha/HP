import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  room_id = ""

  constructor() { }

  get RoomId() {
    return localStorage.getItem("room_id") || ""
    return this.room_id
  }

  set RoomId(room_id: string) {
    localStorage.setItem("room_id", room_id)
    // this.room_id = room_id
  }
}
