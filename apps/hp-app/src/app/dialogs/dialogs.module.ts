import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DRoomSelectComponent } from './d-room-select.component';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DRoomCreateComponent } from './d-room-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DRoomSelectComponent,
    DRoomCreateComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    TableModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    DRoomSelectComponent
  ]
})
export class DialogsModule { }
