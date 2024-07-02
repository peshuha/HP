import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IRoom } from '@vkr/hp-lib';
import { DRoomSelectComponent } from 'apps/hp-app/src/app/module/dialogs/d-room-select.component';
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
    private router: Router
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
            label: "Добавить"
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

}
