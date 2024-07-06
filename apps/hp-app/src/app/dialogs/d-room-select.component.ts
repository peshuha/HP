import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IRoom} from "@vkr/hp-lib"
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { RoomRestService } from '../service/room/room-rest.service';

@Component({
  selector: 'app-d-room-select',
  template: `
    <div #header class="hidden">
      <h4>Выберите Комнату</h4>
    </div>
    <p-table [value]="rooms" [rows]="5" >
      <ng-template pTemplate="header">
          <tr>
              <!-- <th pSortableColumn="_id">#</th> -->
              <th pSortableColumn="name">Name</th>
              <th pSortableColumn="comment">Comment</th>
              <th style="width:4em"></th>
          </tr>
      </ng-template>
      <ng-template pTemplate="body" let-room>
          <tr>
              <!-- <td>{{ room._id }}</td> -->
              <td>{{ room.name }}</td>
              <td>{{ room.comment }}</td>
              <td>
                  <p-button type="button" [text]="true" [rounded]="true" icon="pi pi-plus" (click)="select(room)" />
              </td>
          </tr>
      </ng-template>
  </p-table>
  `,
  styles: `
  .hidden {
    display: none
  }
  `
})
export class DRoomSelectComponent implements OnInit, AfterViewInit {

  rooms: IRoom[] = []
  @ViewChild("header") header: ElementRef | undefined

  constructor(
    private ref: DynamicDialogRef,
    private svc: RoomRestService,
    private host: ElementRef
  ){}

  ngOnInit(): void {
    this.svc.getAll().subscribe(rooms => {
      console.log("DRoomSelectComponent::ngOnInit", rooms)
      this.rooms = rooms
    })
  }

  ngAfterViewInit(): void {
    const title = (this.host.nativeElement as HTMLElement).closest(".p-dialog")?.querySelector(".p-dialog-title")
    if(title){
      title.innerHTML = (this.header?.nativeElement as HTMLElement).innerHTML
    }
  }

  select(room: IRoom) {
    this.ref.close(room)
  }
}
