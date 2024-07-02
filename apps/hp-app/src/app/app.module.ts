import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToastModule } from 'primeng/toast';
import { LoginPageComponent } from './page/login-page/login-page.component';
import { RoomPageComponent } from './page/room-page/room-page.component';
import { RoomPageModule } from './page/room-page/room-page.module';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    AppComponent, 
    LoginPageComponent, 
  ],
  imports: [
    BrowserModule, 
    AppRoutingModule,
    ToastModule,
    RoomPageModule
  ],
  providers: [
    MessageService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
