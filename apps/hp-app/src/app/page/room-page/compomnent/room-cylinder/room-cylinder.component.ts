import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CylinderBufferGeometry } from 'apps/hp-app/src/app/class/CylinderBufferGeometry';
import { SceneDirective } from 'apps/hp-app/src/app/directive/scene.directive';
import { ConfigService } from 'apps/hp-app/src/app/service/config/config.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-room-cylinder',
  template: `
    <div appScene [canvas]="canvas" [room_id]="room_id">
      <canvas #canvas></canvas> 
    </div>
  `,
  styles: `
    :host {
      height: 100%;
      width: 100%;
    }
  `
})
export class RoomCylinderComponent implements OnInit, AfterViewInit {

  room_id: string = ""
  @ViewChild(SceneDirective) dscene: SceneDirective | undefined

  constructor(
    private aroute: ActivatedRoute,
  ) { }  

  ngOnInit(): void {
    this.room_id = this.aroute.snapshot.paramMap.get("room_id") || ""
  }

  ngAfterViewInit(): void {

    this.dscene!.init({
      geometry: new CylinderBufferGeometry(250, 250, 500, 100, 100),
      texture: ConfigService.Config?.appservice + `/room/img/${this.room_id}`
    })
 }
}
