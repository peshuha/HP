import { Component } from '@angular/core';
import { HPFilterService } from 'apps/hp-app/src/app/service/hpfilter/hpfilter.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.css'
})
export class ASideComponent {


  is_red = true
  is_yellow = true
  is_blue = true

  constructor(
    private svcHPF: HPFilterService
  ) {}

  OnChange() {
    
    const status: string[] = []
    
    if(this.is_red)
      status.push("red")
    
    if(this.is_blue)
      status.push("blue")
    
    if(this.is_yellow)
      status.push("yellow")

    this.svcHPF.sendMesage({status})
  }
}
