import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  // Подписное распространение информации для подписчиков
  private sbj = new Subject<string>

  constructor() { }

  getNotifier$() {
    return this.sbj
  }

  sendMesage(msg: string) {
    this.sbj.next(msg)
  }
}
