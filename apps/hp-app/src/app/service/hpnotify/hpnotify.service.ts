import { Injectable } from '@angular/core';
import { IHP } from '@vkr/hp-lib';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class HPNotifyService {

  // Подписное распространение информации для подписчиков
  private sbj = new Subject<IHP | undefined>

  constructor() { }

  getNotifier$() {
    return this.sbj
  }

  sendMesage(msg: IHP | undefined) {
    this.sbj.next(msg)
  }
}
