import { Injectable } from '@angular/core';
import { IHPFilter } from '../../class/hp-filter';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class HPFilterService {

  // Подписное распространение информации для подписчиков
  private sbj = new Subject<IHPFilter | undefined>

  constructor() { }

  getNotifier$() {
    return this.sbj
  }

  sendMesage(hpf: IHPFilter | undefined) {
    this.sbj.next(hpf)
  }
}
