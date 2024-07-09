import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IHP } from '@vkr/hp-lib';
import { HPNotifyService } from 'apps/hp-app/src/app/service/hpnotify/hpnotify.service';

@Component({
  selector: 'app-footer',
  template: '<p #msg></p>',
  styles: ''
})
export class FooterComponent implements OnInit, AfterViewInit {

  @ViewChild("msg") msg: ElementRef | undefined
  private el: HTMLElement | undefined
  hpCurrent: IHP | undefined

  constructor(
    private svcNotify: HPNotifyService
  ){}

  ngOnInit(): void {
    
    // Подписываемся на события
    this.svcNotify.getNotifier$().subscribe(hp => {

      if(this.el && this.hpCurrent !== hp)
        this.hpCurrent = hp
        this.el!.innerHTML = `${hp?.comment || ""} ${hp?.status || ""}`
        // console.log("FooterComponent::getNotifier", hp, this.el?.textContent)
    })
  }

  ngAfterViewInit(): void {
    this.el = <HTMLElement>this.msg?.nativeElement
  }
}
