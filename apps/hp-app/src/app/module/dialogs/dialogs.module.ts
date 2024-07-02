import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DRoomSelectComponent } from './d-room-select.component';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [
    DRoomSelectComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    TableModule
  ],
  exports: [
    DRoomSelectComponent
  ]
})
export class DialogsModule { }
