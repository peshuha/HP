import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IRoom } from '@vkr/hp-lib';
import { DRoomCreateComponent } from 'apps/hp-app/src/app/dialogs/d-room-create.component';
import { DRoomSelectComponent } from 'apps/hp-app/src/app/dialogs/d-room-select.component';
import { AppService } from 'apps/hp-app/src/app/service/app/app.service';
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
    private svcRoom: RoomService,
    private svcApp: AppService
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
      {
        label: "Вид",
        items: [
          {
            label: "Сфера",
            command: (event: MenuItemCommandEvent): void => {
              console.log("this.mnu", this.svcApp.RoomId)
              if(this.svcApp.RoomId) {
                this.router.navigate(["./sphere", this.svcApp.RoomId])
              }
            }
          },
          {
            label: "Цилиндр", 
            command: (event: MenuItemCommandEvent): void => {
              if(this.svcApp.RoomId) {
                this.router.navigate(["./cylinder", this.svcApp.RoomId])
              }
            }
          },
          {
            label: "Цилиндр 1.5π", 
            command: (event: MenuItemCommandEvent): void => {
              if(this.svcApp.RoomId) {
                this.router.navigate(["./cylinder15pi", this.svcApp.RoomId])
              }
            }
          }
        ]
      },
    ]
  }

  selectRoom() {
    this.ref = this.svcDialog.open(DRoomSelectComponent, {
      modal: true
    })

    this.ref.onClose.subscribe(room => {

      if(!room)
        return

      // Устанавливаем текущую комнату
      console.log("this.ref.onClose.subscribe", room)
      this.svcApp.RoomId = room._id
      
      // По умолчанию переходим на сферу
      this.router.navigate(["./sphere", this.svcApp.RoomId])
    })
  }

  addRoom() {
    this.ref = this.svcDialog.open(DRoomCreateComponent, {
      modal: true
    })

    this.ref.onClose.subscribe(room => {
      console.log("HeaderComponent::addRoom", room)
      this.svcRoom.add(<IRoom>room).subscribe()
    })
  }

  

}
