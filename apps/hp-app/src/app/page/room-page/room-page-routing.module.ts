import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomPageComponent } from './room-page.component';
import { SphereComponent } from './compomnent/sphere/sphere.component';
import { StartComponent } from './compomnent/start/start.component';
import { RoomSphereComponent } from './compomnent/room-sphere/room-sphere.component';
import { RoomSphere0Component } from './compomnent/room-sphere/room-sphere0.component';
import { RoomCylinderComponent } from './compomnent/room-cylinder/room-cylinder.component';

const routes: Routes = [
  {
    path: "",
    component: RoomPageComponent,
    children: [
      {
        path: "",
        redirectTo: "sphera",
        pathMatch: 'full'
      }, 
      {
        path: "start",
        component: StartComponent
      },  
      {
        path: "sphera/:room_id",
        component: RoomSphereComponent
      },  
      {
        path: "cylinder/:room_id",
        component: RoomCylinderComponent
      },
      {
        path: "sphera",
        component: SphereComponent
      }    
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomPageRoutingModule { }
