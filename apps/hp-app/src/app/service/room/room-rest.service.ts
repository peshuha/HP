import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRoom } from '@vkr/hp-lib';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root'
})
export class RoomRestService {

  constructor(
    private http: HttpClient
  ) { }

  getAll () {
    return this.http.get<IRoom[]>(ConfigService.Config?.appservice + "/room")
  }

  add(room: IRoom, img: File) {
    console.log("RoomRestService::add", room, img, Object.keys(room))
    

    const fm = new FormData
    for(let k of Object.keys(room)) {

      fm.append(k, Reflect.get(room, k))
    }
    // fm.append("img", img)

    // Display the key/value pairs
    for (var pair of fm.entries()) {
      console.log("RoomRestService::add-fm", pair[0]+ ', ' + pair[1]); 
    }    
    return this.http.post<IRoom>(ConfigService.Config?.appservice + "/room", fm)
  }
}
