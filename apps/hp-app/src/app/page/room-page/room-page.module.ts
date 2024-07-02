import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomPageRoutingModule } from './room-page-routing.module';
import { HeaderComponent } from './compomnent/header/header.component';
import { FooterComponent } from './compomnent/footer/footer.component';
import { ASideComponent } from './compomnent/aside/aside.component';
import { RoomPageComponent } from './room-page.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ASideComponent,
    RoomPageComponent
  ],
  imports: [
    CommonModule,
    RoomPageRoutingModule
  ]
})
export class RoomPageModule { }
