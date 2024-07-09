import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomPageRoutingModule } from './room-page-routing.module';
import { HeaderComponent } from './compomnent/header/header.component';
import { FooterComponent } from './compomnent/footer/footer.component';
import { ASideComponent } from './compomnent/aside/aside.component';
import { RoomPageComponent } from './room-page.component';
import { MenubarModule } from 'primeng/menubar';
import { StartComponent } from './compomnent/start/start.component';
import { RoomSphereComponent } from './compomnent/room-sphere/room-sphere.component';
import { RoomSphere0Component } from './compomnent/room-sphere/room-sphere0.component';
import { SceneDirective } from '../../directive/scene.directive';
import { RoomCylinderComponent } from './compomnent/room-cylinder/room-cylinder.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ASideComponent,
    RoomPageComponent,
    StartComponent,
    RoomSphereComponent,
    RoomSphere0Component,
    SceneDirective,
    RoomCylinderComponent
  ],
  imports: [
    CommonModule,
    RoomPageRoutingModule,
    MenubarModule,
    FormsModule,
  ]
})
export class RoomPageModule { }
