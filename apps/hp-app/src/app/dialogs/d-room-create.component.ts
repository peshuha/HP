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
    <form [formGroup]="form"  class="row col-12">
<!-- class="form w-25" -->
      <div>
        <div class="row">
          <label for="3eb096e9-b537-488e-b5e6-ff1be824c0b8" class="col-6">Название комнаты</label>
          <input type="text" class="col-6 mb-3" id="3eb096e9-b537-488e-b5e6-ff1be824c0b8" formControlName="name">
        </div>
        <div class="row">
          <label for="" class="col-6">Примечание</label>
          <input type="text" class="col-6 mb-3" id="" formControlName="comment">
        </div>
        <div class="row">
          <label for="53a2e91c-7e24-498d-bb11-9c95eb818dc4" class="col-6">Изображение</label>
          <input type="file" #file class="col-6 mb-3" id="53a2e91c-7e24-498d-bb11-9c95eb818dc4" formControlName="img">
        </div>
        <div class="row">
          <button class="mb-6 col-3 btn btn-success" (click)="Create()">Создать</button>
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
  @ViewChild("file") file: ElementRef | undefined

  // Ссылка на форму
  form = new FormGroup({
    name: new FormControl(),
    comment: new FormControl(),
    img: new FormControl(),
  })

  constructor(
    private dlg: DynamicDialogRef,
    private svc: RoomRestService,
    private host: ElementRef
  ){}

  ngAfterViewInit(): void {
    const title = (this.host.nativeElement as HTMLElement).closest(".p-dialog")?.querySelector(".p-dialog-title")
    if(title){
      title.innerHTML = (this.header?.nativeElement as HTMLElement).innerHTML
    }
  }

  Create() {
    const files = (this.file?.nativeElement as HTMLInputElement).files
    console.log("DRoomCreateComponent::Close()", files)
    if(!files || !files[0])
      return
    
    this.dlg.close({
      name: this.form.getRawValue().name,
      comment: this.form.getRawValue().comment,
      img: this.file?.nativeElement.files[0]
    })
  }
}
