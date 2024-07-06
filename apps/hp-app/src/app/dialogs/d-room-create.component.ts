import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { RoomRestService } from '../service/room/room-rest.service';

// import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-droom-create',
  template: `
    <div #header class="hidden">
      <h4>Создание комнаты</h4>
    </div>
    <form [formGroup]="form">

      <div class="row col-6">
        <div class="row">
          <label for="3eb096e9-b537-488e-b5e6-ff1be824c0b8" class="col-6">Название тура</label>
          <input type="text" class="col-6 mb-3" id="3eb096e9-b537-488e-b5e6-ff1be824c0b8" formControlName="name">
        </div>
        <div class="row">
          <label for="" class="col-6">Описание тура</label>
          <input type="text" class="col-6 mb-3" id="" formControlName="description">
        </div>
        <div class="row">
          <label for="440a99cd-3021-4834-bb7a-7b0cc821e87b" class="col-6">Туроператор</label>
          <input type="text" class="col-6 mb-3" id="440a99cd-3021-4834-bb7a-7b0cc821e87b" formControlName="tourOperator">
        </div>
        <div class="row">
          <label for="7ff90e80-76a8-44b6-8ca1-5bf9a3a6d650" class="col-6">Стоимость</label>
          <input type="number" class="col-6 mb-3" id="7ff90e80-76a8-44b6-8ca1-5bf9a3a6d650" formControlName="price">
        </div>
        <div class="row">
          <label for="53a2e91c-7e24-498d-bb11-9c95eb818dc4" class="col-6">Изображения</label>
          <!-- <input type="file" multiple="true" #files class="col-6 mb-3" id="53a2e91c-7e24-498d-bb11-9c95eb818dc4" formArrayName="imgs" (change)="OnSelectImage($event)"> -->
        </div>
        <div class="row">
          <!-- <button class="mb-3 col-3 btn btn-success" (click)="OnSave()">Сохранить (v1)</button> -->
        </div>
        <div class="row">
          <!-- <button class="mb-3 col-3 btn btn-success" (click)="OnSave2()">Сохранить (v2)</button> -->
        </div>
      </div> 
    </form>
  `,
  styles: `
  .hidden {
    display: none
  }
  `
  })
export class DRoomCreateComponent implements AfterViewInit {

  @ViewChild("header") header: ElementRef | undefined

  // Ссылка на форму
  form = new FormGroup({
    name: new FormControl(),
    description: new FormControl(),
    tourOperator: new FormControl(),
    price: new FormControl(),
    // imgs: this.formBuilder.array([]),
    imgs: new FormControl(),
  })

  constructor(
    private ref: DynamicDialogRef,
    private svc: RoomRestService,
    private host: ElementRef
  ){}

  ngAfterViewInit(): void {
    const title = (this.host.nativeElement as HTMLElement).closest(".p-dialog")?.querySelector(".p-dialog-title")
    if(title){
      title.innerHTML = (this.header?.nativeElement as HTMLElement).innerHTML
    }
  }
}
