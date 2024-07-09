import { AfterViewInit, Directive, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { IHP, IPoint, IProdnum } from '@vkr/hp-lib';
import * as THREE from "three"
import { HPService } from '../service/hp/hp.service';
import { RoomService } from '../service/room/room.service';
import { SphereBufferGeometry } from '../class/SphereBufferGeometry';
import { inside, uvToVector3 } from '../class/point-utils';
import { Observable, Subject, Subscription } from 'rxjs';
import { HPNotifyService } from '../service/hpnotify/hpnotify.service';
import { HPFilterService } from '../service/hpfilter/hpfilter.service';
import { IHPFilter } from '../class/hp-filter';
import { HPStatus } from '../class/hp-status';


@Directive({
  selector: '[appScene]',
  inputs: [
    {
      // Canvas, где создаем сцену
      name: "canvas",
      required: true
    }, 
    // {
    //   // Форма фигуры на что натягиваем изображение
    //   name: "geometry",
    //   required: true
    // },
    {
      // Через что передаем все события
      name: "activator",
      required: false
    },
    {
      name: "room_id",
      required: true
    }
  ]
})
export class SceneDirective implements OnInit, AfterViewInit, OnDestroy {

  // directive
  activator: Subject<any> | undefined
  // geometry: SphereBufferGeometry | undefined
  room_id: string = ""

  camera: any; 
  scene: THREE.Scene | undefined
  renderer: THREE.WebGLRenderer | undefined
  e: any
  sphere: THREE.Mesh | undefined

  lon: number = 0; lat: number = 0 

  mouseDown: any;
  rectStart: any; 

  mouse: any; 
  raycaster: THREE.Raycaster | undefined;
  texture: THREE.Texture | undefined


  canvas: HTMLCanvasElement | undefined; 
  parent: HTMLElement | undefined

  npoint = 1
  hps: IHP[] = []
  statuses: HPStatus[] = ['blue', 'red', 'yellow']

  // Фильтр
  hpf$: Subscription | undefined
  hpf: IHPFilter | undefined

  constructor(
    private el: ElementRef,
    private svcHP: HPService,
    private svcRoom: RoomService,
    private svcNotify: HPNotifyService,
    private svcHPF: HPFilterService
  ) { }

  ngOnInit(): void {
    console.log("SceneDirective::ngOnInit()")
  }

  ngAfterViewInit(): void {
    console.log("SceneDirective::ngAfterViewInit()")
    
  }

  ngOnDestroy(): void {
    console.log("SceneDirective::ngOnDestroy()")
  }

  init(json: any){

    if(!this.isWebGLSupported()) {
      console.error("isWebGLSupported() == false")
      return
    }

    const host: HTMLElement = this.el.nativeElement
    this.parent = <HTMLElement>host.parentElement?.parentElement

    this.mouseDown = {};
    this.rectStart = {};
    this.mouse = new THREE.Vector2();
    this.raycaster = new THREE.Raycaster();

    // Сцена
    this.scene = new THREE.Scene();
    
    // Камера
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1100);
    this.camera.target = new THREE.Vector3(0, 0, 0);

    // Сфера с изображением
    // const geometry = new SphereBufferGeometry(500, 60, 40)// , 0, 1.39, 1.23, 0.30); //)
    // this.geometry.scale(-1, 1, 1);

    this.texture = new THREE.TextureLoader().load(json.texture, () => this.displayHP())
 
    const material = new THREE.MeshBasicMaterial( { map: this.texture} )

    // Разворачиваем geometry внутрь
    json.geometry.scale(-1, 1, 1);
    this.sphere = new THREE.Mesh( json.geometry, material )

    
    this.scene.add(this.sphere!)

    this.renderer = new THREE.WebGLRenderer({canvas: this.canvas});
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.parent!.clientWidth, this.parent!.clientHeight);
    // this.renderer.setSize(this.canvas!.width, this.canvas!.height);
    // this.renderer.setSize(innerWidth, innerHeight);
    console.log("this.renderer.domElement", this.canvas, this.renderer.domElement)

    // Подписываемся на фильтр
    this.hpf$ = this.svcHPF.getNotifier$().subscribe(hpf => {
      this.hpf = hpf
      this.displayHP()
    })


    addEventListener('mousedown', this.onPointerStart.bind(this));
    addEventListener('mousemove', this.onPointerMove.bind(this));
    addEventListener('mouseup', this.onPointerUp.bind(this));
    addEventListener('wheel', this.onDocumentMouseWheel.bind(this));
    addEventListener('touchstart', this.onPointerStart.bind(this));
    addEventListener('touchmove', this.onPointerMove.bind(this));
    addEventListener('touchend', this.onPointerUp.bind(this));
    addEventListener('resize', this.onWindowResize.bind(this));
    this.animate();
  }

  uninit() {
    removeEventListener('mousedown', this.onPointerStart);
    removeEventListener('mousemove', this.onPointerMove);
    removeEventListener('mouseup', this.onPointerUp);
    removeEventListener('wheel', this.onDocumentMouseWheel);
    removeEventListener('touchstart', this.onPointerStart);
    removeEventListener('touchmove', this.onPointerMove);
    removeEventListener('touchend', this.onPointerUp);
    removeEventListener('resize', this.onWindowResize);
  }

  onWindowResize() {
    // console.log("onWindowResize0", this.parent?.clientWidth, this.parent?.clientHeight, innerWidth / innerHeight)
    // console.log("onWindowResize1", this.canvas!.width, this.canvas!.height, innerWidth / innerHeight)
    // console.log("onWindowResize2", this.renderer?.domElement.width, this.renderer?.domElement.height)
   // this.camera.aspect = this.host!.clientWidth / this.host!.clientHeight;
    // this.camera.aspect = this.canvas!.width / this.canvas!.height;
    this.camera.aspect = innerWidth / innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer!.setSize(this.parent!.clientWidth, this.parent!.clientHeight);
    // this.renderer!.setSize( this.canvas!.width / this.camera.aspect, this.canvas!.height / this.camera.aspect);
    // this.renderer!.setSize( innerWidth, innerHeight );
    // console.log("onWindowResize -a", this.renderer?.domElement.width, this.renderer?.domElement.height)
  }

  // Отобразить все hp
  displayHP() {

    // Сначала все удаляем ( Удаляем через список id. Иначе всех не обходит)
    const children = this.sphere!.children.map(ch => ch.id)
    for(let id of children) {
      const ch = this.scene!.getObjectById(id)
      ch!.removeFromParent()
    }

    console.log("after remove", this.sphere!.children)

    // Затем добавляем
    this.svcHP.get(this.room_id).subscribe(hps => {

      this.hps = hps
      console.log("displayHP().hps", hps)
      for(let hp of this.hps) {

        // Проверяем по фильтру. Подходят ли
        let bOk = true
        if(this.hpf) {

          bOk = false
          if(hp.status && this.hpf.status && this.hpf.status.includes(hp.status)) {
            bOk = true
          }
        }

        if(!bOk)
          continue

        if(!hp.polygon.length)
          continue
  
        // Отталкиваемся от статуса
        const status = hp.status || ""

        console.log("displayHP().hp", hp, status)
  
        // Обычный
        if(status === "") {
      
          // Из точек формируем полигон
          const polygon: THREE.Vector3[] = []
          hp.polygon.forEach(p => polygon.push(uvToVector3(this.sphere!, this.xyTouv(p)!)!))
  
          // Формируем замыкание фигуры
          polygon.push(uvToVector3(this.sphere!, this.xyTouv(hp.polygon[0])!)!)
  
          const material = new THREE.LineBasicMaterial({
            color: 0xF0FD13,  // ytjyjdsq ptktysq
            linewidth: 4
          });    
  
          // Формируем объект
          const geometry = new THREE.BufferGeometry().setFromPoints(polygon);
          this.sphere!.add(new THREE.Line(geometry, material))      
        }

        else if(status === "blue") {
      
          // Из точек формируем полигон
          const polygon: THREE.Vector3[] = []
          hp.polygon.forEach(p => polygon.push(uvToVector3(this.sphere!, this.xyTouv(p)!)!))
  
          // Формируем замыкание фигуры
          polygon.push(uvToVector3(this.sphere!, this.xyTouv(hp.polygon[0])!)!)
  
          const material = new THREE.LineBasicMaterial({
            color: 0x0F8FA1,  // blue
            linewidth: 3
          });    
  
          // Формируем объект
          const geometry = new THREE.BufferGeometry().setFromPoints(polygon);
          this.sphere!.add(new THREE.Line(geometry, material))      
        }

        else if(status === "red") {
      
          // Из точек формируем полигон
          const polygon: THREE.Vector3[] = []
          hp.polygon.forEach(p => polygon.push(uvToVector3(this.sphere!, this.xyTouv(p)!)!))
  
          // Формируем замыкание фигуры
          polygon.push(uvToVector3(this.sphere!, this.xyTouv(hp.polygon[0])!)!)
  
          const material = new THREE.LineBasicMaterial({
            color: 0xAB0949,  // red
            linewidth: 3
          });    
  
          // Формируем объект
          const geometry = new THREE.BufferGeometry().setFromPoints(polygon);
          this.sphere!.add(new THREE.Line(geometry, material))      
        }

        else if(status === "yellow") {
      
          // Из точек формируем полигон
          const polygon: THREE.Vector3[] = []
          hp.polygon.forEach(p => polygon.push(uvToVector3(this.sphere!, this.xyTouv(p)!)!))
  
          // Формируем замыкание фигуры
          polygon.push(uvToVector3(this.sphere!, this.xyTouv(hp.polygon[0])!)!)
  
          const material = new THREE.LineBasicMaterial({
            color: 0xD9D119,  // yellow
            linewidth: 3
          });    
  
          // Формируем объект
          const geometry = new THREE.BufferGeometry().setFromPoints(polygon);
          this.sphere!.add(new THREE.Line(geometry, material))      
        }
  
      }
    })
  }

  isWebGLSupported () {
    const test = document.createElement('canvas');
    const ok = !!(window.WebGLRenderingContext && test.getContext('webgl'));
    test.remove()
    return ok
  };

  animate() {
    requestAnimationFrame(this.animate.bind(this));

    let phi = THREE.MathUtils.degToRad( 90 - this.lat );
    let theta = THREE.MathUtils.degToRad( this.lon );
    this.camera.target.x = 0.001*Math.sin(phi)*Math.cos(theta);
    this.camera.target.y = 0.001*Math.cos(phi);
    this.camera.target.z = 0.001*Math.sin(phi)*Math.sin(theta);
    this.camera.lookAt(this.camera.target);
    this.e && this.raycast(this.e);
    this.renderer!.render(this.scene!, this.camera);
  }

  getSphereCoord(clientX: number, clientY: number) {
    var rect = this.renderer!.domElement.getBoundingClientRect();
    var x = (clientX - rect.left)/rect.width,
        y = (clientY - rect.top)/rect.height;

    this.mouse.set(x*2 - 1, 1 - y*2);
    this.raycaster!.setFromCamera(this.mouse, this.camera);
    var intersects = this.raycaster!.intersectObjects( this.scene!.children );
    return intersects[0].point;
  }

  getUVCoord(clientX: number, clientY: number) {
    var rect = this.renderer!.domElement.getBoundingClientRect();
    var x = (clientX - rect.left)/rect.width,
        y = (clientY - rect.top)/rect.height;

    this.mouse.set(x*2 - 1, 1 - y*2);
    this.raycaster!.setFromCamera(this.mouse, this.camera);
    var intersects = this.raycaster!.intersectObjects( this.scene!.children );
    return intersects[0].uv;
  }

  raycast(event: any) {

    var rect = this.renderer!.domElement.getBoundingClientRect();
    var x = (event.clientX - rect.left)/rect.width,
        y = (event.clientY - rect.top)/rect.height;

    this.mouse.set(x*2 - 1, 1 - y*2);
    this.raycaster!.setFromCamera(this.mouse, this.camera);
    
    const x2 = event.clientX || event.touches[0].clientX;
    const y2 = event.clientY || event.touches[0].clientY;  
    
    // Получаем пересечения
    var intersects = this.raycaster!.intersectObjects( this.scene!.children );
    if(!intersects || !intersects[0] || !intersects[0].uv?.y)
      return

    // Получаем точку в координатах исходника
    const p = this.uvToxy(intersects[0].uv!)
    const p2 = this.uvToxy(this.getUVCoord(x2, y2)!)

    // Ищем ту область, в которой у нас точка
    let hpCurrent: IHP | undefined
    for(let hp of this.hps) {
      
      if(!inside(p, hp.polygon))
        continue

      hpCurrent = hp
      break
    }
    this.svcNotify.sendMesage(hpCurrent)

  }

  private onPointerMove( event: any ) {

    this.raycast(this.e = event);
    if (!this.mouseDown.x) return;

    // console.log("onPointerMove", this.camera.position, this.camera.target)

    let clientX = event.clientX || event.touches[0].clientX;
    let clientY = event.clientY || event.touches[0].clientY;
    this.lon = (this.mouseDown.x - clientX)*this.camera.fov/600 + this.mouseDown.lon;
    this.lat = (clientY - this.mouseDown.y)*this.camera.fov/600 + this.mouseDown.lat;
    this.lat = Math.max( - 85, Math.min( 85, this.lat ) );
  }

  private onPointerStart( event: any ) {

    if(event.ctrlKey) {
      this.rectStart.x = event.clientX || event.touches[ 0 ].clientX;
      this.rectStart.y = event.clientY || event.touches[ 0 ].clientY;
      this.rectStart.lon = this.lon;
      this.rectStart.lat = this.lat;

      // var vector = new THREE.Vector3( this.rectStart.x, this.rectStart.y, -1 ).unproject( this.camera );
      // console.log("ctrl-from", vector)
      return
    }
    this.mouseDown.x = event.clientX || event.touches[ 0 ].clientX;
    this.mouseDown.y = event.clientY || event.touches[ 0 ].clientY;
    this.mouseDown.lon = this.lon;
    this.mouseDown.lat = this.lat;
  }

  private onPointerUp(event: any) {
    this.mouseDown.x = null;
    if(event.ctrlKey && this.rectStart.x) {

      // Формируем прямоугольник
      const polygon = this.buildRectXY(event)
      console.log("onPointerUp(event)", polygon)

      // Добавляем его к списку HP
      const prodnum: IProdnum = {prodnum: `rect ${this.npoint}`, qty: 0, comment: ""}
      this.svcHP.add({
        room_id: this.room_id,
        polygon,
        comment: `hp №${this.npoint}`,
        status: this.statuses[this.npoint % this.statuses.length]
      }).subscribe(x => {

        // Перерисовываем 
        this.displayHP()
      })

      this.npoint += 1

    }
    this.rectStart.x = null;
  }

  private buildRect1(event: any) {

    const material = new THREE.LineBasicMaterial({
      color: 0xFF65FC,
      linewidth: 3
    });

    const x = this.rectStart.x
    const y = this.rectStart.y
    const x2 = event.clientX || event.touches[0].clientX;
    const y2 = event.clientY || event.touches[0].clientY;

    // Используем точки от кликов
    const polygon: THREE.Vector3[] = []
    polygon.push(this.getSphereCoord(x, y))
    polygon.push(this.getSphereCoord(x2, y))
    polygon.push(this.getSphereCoord(x2, y2))
    polygon.push(this.getSphereCoord(x, y2))
    polygon.push(this.getSphereCoord(x, y))

    // // Формируем объект
    const geometry = new THREE.BufferGeometry().setFromPoints(polygon);

    const objLast = new THREE.Line(geometry, material);
    console.log("onPointerUp() build line", objLast)
    this.sphere!.add(objLast)

  }

  private buildRect2(event: any) {

    const material = new THREE.LineBasicMaterial({
      color: 0xF8FA19,
      linewidth: 3
    });

    const x = this.rectStart.x
    const y = this.rectStart.y
    const x2 = event.clientX || event.touches[0].clientX;
    const y2 = event.clientY || event.touches[0].clientY;

    // Используем точки от кликов
    const polygon: THREE.Vector3[] = []
    polygon.push(uvToVector3(this.sphere!, this.getUVCoord(x, y)!)!)
    polygon.push(uvToVector3(this.sphere!, this.getUVCoord(x2, y)!)!)
    polygon.push(uvToVector3(this.sphere!, this.getUVCoord(x2, y2)!)!)
    polygon.push(uvToVector3(this.sphere!, this.getUVCoord(x, y2)!)!)
    polygon.push(uvToVector3(this.sphere!, this.getUVCoord(x, y)!)!)

    // // Формируем объект
    const geometry = new THREE.BufferGeometry().setFromPoints(polygon);

    const objLast = new THREE.Line(geometry, material);
    console.log("onPointerUp() build line", objLast)
    this.sphere!.add(objLast)
  }

  private buildRectXY(event: any): IPoint[] {

    const x = this.rectStart.x
    const y = this.rectStart.y
    const x2 = event.clientX || event.touches[0].clientX;
    const y2 = event.clientY || event.touches[0].clientY;

    // Используем точки от кликов
    const polygon: IPoint[] = []
    polygon.push(this.uvToxy(this.getUVCoord(x, y)!)!)
    polygon.push(this.uvToxy(this.getUVCoord(x2, y)!)!)
    polygon.push(this.uvToxy(this.getUVCoord(x2, y2)!)!)
    polygon.push(this.uvToxy(this.getUVCoord(x, y2)!)!)

    return polygon
  }

  private uvToxy(uv: THREE.Vector2): IPoint {

    const data = this.texture?.source.data
    // console.log("uvToxy texture", data.height, data.width)

    const y = Math.floor((1-uv.y)*data!.height);
    const x = Math.floor(uv.x*data!.width);
    return {x, y} as IPoint 
  }

  private xyTouv(xy: IPoint): THREE.Vector2 {

    const data = this.texture?.source.data
    // console.log("xyTouv texture", data.height, data.width)

    const ux = xy.x / data!.width
    const uy = 1 - xy.y / data!.height
    return new THREE.Vector2(ux, uy) 
  }

  private onDocumentMouseWheel( event: any ) {
    let fov = this.camera.fov + event.deltaY * 0.05;
    this.camera.fov = THREE.MathUtils.clamp(fov, 10, 75);
    // console.log("onDocumentMouseWheel( event ) - begin", event, this.camera.fov)
    this.camera.updateProjectionMatrix();
    // console.log("onDocumentMouseWheel( event ) - end", event, this.camera.fov)
  }
}
