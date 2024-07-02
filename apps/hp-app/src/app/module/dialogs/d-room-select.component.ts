import { Component, OnInit } from '@angular/core';
import { IRoom} from "@vkr/hp-lib"
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { RoomRestService } from '../../service/room/room-rest.service';

@Component({
  selector: 'app-d-room-select',
  template: `
    <p-table [value]="rooms" [rows]="5" >
      <ng-template pTemplate="header">
          <tr>
              <th pSortableColumn="_id">#</th>
              <th pSortableColumn="name">Name</th>
              <th pSortableColumn="comment">Comment</th>
              <th style="width:4em"></th>
          </tr>
      </ng-template>
      <ng-template pTemplate="body" let-room>
          <tr>
              <td>{{ room._id }}</td>
              <td>{{ room.name }}</td>
              <!-- <td><img src="https://primefaces.org/cdn/primeng/images/demo/room/{{ room.image }}" [alt]="room.image" class="w-4rem h-4rem shadow-2" /></td> -->
              <td>{{ room.comment }}</td>
              <td>
                  <p-button type="button" [text]="true" [rounded]="true" icon="pi pi-plus" (click)="select(room)" />
              </td>
          </tr>
      </ng-template>
  </p-table>
  `,
  styles: ``
})
export class DRoomSelectComponent implements OnInit {

  rooms: IRoom[] = []

  constructor(
    private ref: DynamicDialogRef,
    private svc: RoomRestService
  ){}

  ngOnInit(): void {
    this.svc.getAll().subscribe(rooms => {
      console.log("DRoomSelectComponent::ngOnInit", rooms)
      this.rooms = rooms
    })
  }

  select(room: IRoom) {
    this.ref.close(room)
  }
}
