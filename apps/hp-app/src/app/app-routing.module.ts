import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "room",
    title: "Tour Application"
   },
  {
    path: "room",
    loadChildren: () => import("./page/room-page/room-page.module").then(m =>m.RoomPageModule),
    // canActivate: []
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
