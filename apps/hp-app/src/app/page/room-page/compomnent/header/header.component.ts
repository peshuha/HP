import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IRoom } from '@vkr/hp-lib';
import { DRoomCreateComponent } from 'apps/hp-app/src/app/dialogs/d-room-create.component';
import { DRoomSelectComponent } from 'apps/hp-app/src/app/dialogs/d-room-select.component';
import { RoomService } from 'apps/hp-app/src/app/service/room/room.service';
import { MenuItem, MenuItemCommandEvent } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  mnu: MenuItem[] | undefined
  ref: DynamicDialogRef | undefined;

  constructor(
    private svcDialog: DialogService,
    private router: Router,
    private svcRoom: RoomService
  ) {}

  ngOnInit(): void {
    this.mnu = [
      {
        label: "Комната",
        items: [
          {
            label: "Выбрать",
            command: (event: MenuItemCommandEvent): void => this.selectRoom()
          },
          {
            label: "Добавить", 
            command: (event: MenuItemCommandEvent): void => this.addRoom()
          },
          {
            label: "Удалить"
          }
        ]
      },
    ]
  }

  selectRoom() {
    this.ref = this.svcDialog.open(DRoomSelectComponent, {
      modal: true
    })

    this.ref.onClose.subscribe(r => {
      const room: IRoom = r
      console.log("this.ref.onClose", room)
      if(!room){
        return
      }
      
      this.router.navigate(["./room", room._id])
    })
  }

  addRoom() {
    this.ref = this.svcDialog.open(DRoomCreateComponent, {
      modal: true
    })

    this.ref.onClose.subscribe(r => {
      console.log("HeaderComponent::addRoom", r)
      this.svcRoom.add(r, r.img).subscribe()
      return
      const room: IRoom = r
      console.log("this.ref.onClose", room)
      if(!room){
        return
      }
      
      this.router.navigate(["./room", room._id])
    })
  }

}
