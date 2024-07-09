import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CylinderBufferGeometry } from 'apps/hp-app/src/app/class/CylinderBufferGeometry';
import { SceneDirective } from 'apps/hp-app/src/app/directive/scene.directive';
import { ConfigService } from 'apps/hp-app/src/app/service/config/config.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-room-cylinder15pi',
  template: `
    <div #host 

    appScene
    [canvas]="canvas"
    [room_id]="room_id"

    >
        <canvas #canvas></canvas> 
    </div>
    <div class="info" #info></div>  
  `,
  styles: `
    :host {
      height: 100%;
      width: 100%;
      // padding: 1rem;
    }
    .canvas {
        border: 4px solid red;
    }
    .info {
        position: absolute;
        background-color: rgba(135, 96, 96, 0.5);
        color: white;
        font-family: Arial, sans-serif;
        font-size: 18px;
        padding: 0 10px 0 10px;
        opacity: 0;
    }
  `
})
export class RoomCylinder15piComponent implements OnInit, AfterViewInit {

  // directive scene
  activator = new Subject; 
  room_id: string = ""

  @ViewChild(SceneDirective) dscene: SceneDirective | undefined
  @ViewChild("info") _info: ElementRef | undefined

  info: HTMLDivElement | undefined

  constructor(
    private aroute: ActivatedRoute,
  ) { }  

  ngOnInit(): void {
    this.room_id = this.aroute.snapshot.paramMap.get("room_id") || ""
    console.log("RoomCylinder15piComponent::ngOnInit()", this.room_id)
  }

  ngAfterViewInit(): void {

    this.dscene!.init({
      geometry: new CylinderBufferGeometry(250, 250, 500, 100, 100, false, Math.PI, Math.PI * 1.5),
      texture: ConfigService.Config?.appservice + `/room/img/${this.room_id}`
    })

 }

}
