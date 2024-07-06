import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';
import { IHP } from '@vkr/hp-lib';

@Injectable({
  providedIn: 'root'
})
export class HotPolygonRestService {

  constructor(
    private http: HttpClient
  ) { }

  get(room_id: string) {
    return this.http.get<IHP[]>(ConfigService.Config?.appservice + `/hp/${room_id}`)
  }

  add(hp:IHP) {
    return this.http.post<IHP>(ConfigService.Config?.appservice + "/hp", {hp})
  }

  change(hp:IHP) {
    return this.http.put<IHP>(ConfigService.Config?.appservice + "/hp", {hp})
  }

  delete(hp:IHP) {
    return this.http.delete<IHP>(ConfigService.Config?.appservice + "/hp", {body: hp})
  }
}
