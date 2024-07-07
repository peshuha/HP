import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IHP, IPoint, IProdnum } from '@vkr/hp-lib';
import { SphereBufferGeometry } from 'apps/hp-app/src/app/class/SphereBufferGeometry';
import { inside, uvToVector3 } from 'apps/hp-app/src/app/class/point-utils';
import { SceneDirective } from 'apps/hp-app/src/app/directive/scene.directive';
import { ConfigService } from 'apps/hp-app/src/app/service/config/config.service';
import { HPService } from 'apps/hp-app/src/app/service/hp/hp.service';
import { RoomService } from 'apps/hp-app/src/app/service/room/room.service';
import { Subject } from 'rxjs';
import * as THREE from "three"

@Component({
  selector: 'app-room-sphere',
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
export class RoomSphereComponent implements OnInit, AfterViewInit {

  // directive scene
  activator = new Subject; 
  room_id: string = ""

  @ViewChild(SceneDirective) dscene: SceneDirective | undefined
  
  @ViewChild("info") _info: ElementRef | undefined
  @ViewChild("host") _host: ElementRef | undefined

  canvas: HTMLCanvasElement | undefined; 
  info: HTMLDivElement | undefined

  constructor(
    private aroute: ActivatedRoute,
  ) { }  

  ngOnInit(): void {

    this.room_id = this.aroute.snapshot.paramMap.get("room_id") || ""
    console.log("RoomSphereComponent::ngOnInit()", this.room_id)
  }

  ngAfterViewInit(): void {

    this.info = this._info?.nativeElement

    const geometry = new SphereBufferGeometry(500, 60, 40)// , 0, 1.39, 1.23, 0.30); //)
    geometry.scale(-1, 1, 1);

    console.log("RoomSphereComponent::ngAfterViewInit().dscene", this.dscene)
    this.dscene!.init({
      geometry: geometry,
      texture: ConfigService.Config?.appservice + `/room/img/${this.room_id}`
    })

 }

}
