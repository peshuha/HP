import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToastModule } from 'primeng/toast';
import { RoomPageModule } from './page/room-page/room-page.module';
import { MessageService } from 'primeng/api';
import { LoginPageModule } from './page/login-page/login-page.module';
import { ConfigService } from './service/config/config.service';
import { DialogsModule } from './dialogs/dialogs.module';
import { HttpClientModule } from '@angular/common/http';
import { DialogService } from 'primeng/dynamicdialog';

@NgModule({
  declarations: [
    AppComponent, 
  ],
  imports: [
    BrowserModule, 
    AppRoutingModule,
    ToastModule,
    LoginPageModule, 
    RoomPageModule,
    DialogsModule,
    HttpClientModule,
  ],
  providers: [
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: ConfigService.ConfigInitialize,
      deps: [ConfigService],
      multi: true,
    },
    provideAnimations(),
    DialogService, 
    MessageService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

