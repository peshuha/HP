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
}
