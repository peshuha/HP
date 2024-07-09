import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomPageComponent } from './room-page.component';
import { SphereComponent } from './compomnent/sphere/sphere.component';
import { StartComponent } from './compomnent/start/start.component';
import { RoomSphereComponent } from './compomnent/room-sphere/room-sphere.component';
import { RoomSphere0Component } from './compomnent/room-sphere/room-sphere0.component';
import { RoomCylinderComponent } from './compomnent/room-cylinder/room-cylinder.component';
import { RoomCylinder15piComponent } from './compomnent/room-cylinder15pi/room-cylinder15pi.component';

const routes: Routes = [
  {
    path: "",
    component: RoomPageComponent,
    children: [
      {
        path: "",
        redirectTo: "sphere",
        pathMatch: 'full'
      }, 
      {
        path: "start",
        component: StartComponent
      },  
      {
        path: "sphere/:room_id",
        component: RoomSphereComponent
      },  
      {
        path: "cylinder15pi/:room_id",
        component: RoomCylinder15piComponent
      },
      {
        path: "cylinder/:room_id",
        component: RoomCylinderComponent
      },  
      {
        path: "sphere",
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
