import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomPageComponent } from './room-page.component';
import { SpheraComponent } from './compomnent/sphera/sphera.component';
import { StartComponent } from './compomnent/start/start.component';

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
        path: "sphera",
        component: SpheraComponent
      }    
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomPageRoutingModule { }
