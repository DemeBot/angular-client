import { Component, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';

@Component({
  selector: 'machine',
  styleUrls: ['./machine.component.css'],
  templateUrl: './machine.component.html'
})

export class MachineComponent implements OnInit, AfterViewInit {
  @ViewChild("myCanvas") canvas: ElementRef;
  @ViewChild("zCanvas") zCanvas: ElementRef;
  angle = 0;
  gantryRadius = 15;
  gantryMinRadius = 15;
  gantryMaxRadius = 290;
  zMinPosition = .01;
  zMaxPosition = 1;
  zPostion = this.zMaxPosition;

  ngAfterViewInit() {
    this.renderPlot();
    this.drawPosition(this.angle, this.gantryRadius, this.zPostion);
  }

  ngOnInit() {

  }

  btnIn(): void {
    if (this.gantryRadius > this.gantryMinRadius) this.gantryRadius = this.gantryRadius - 5;
    this.drawPosition(this.angle, this.gantryRadius, this.zPostion);
  }
  btnOut(): void {
    if (this.gantryRadius < this.gantryMaxRadius) this.gantryRadius = this.gantryRadius + 5;
    this.drawPosition(this.angle, this.gantryRadius, this.zPostion);
  }
  btnUp(): void {
    if (this.zPostion > this.zMinPosition) this.zPostion = this.zPostion - .05;
    this.drawPosition(this.angle, this.gantryRadius, this.zPostion);
  }
  btnDown(): void {
    if (this.zPostion < this.zMaxPosition) this.zPostion = this.zPostion + .05;
    this.drawPosition(this.angle, this.gantryRadius, this.zPostion);
  }
  btnClockwise(): void {
    if (this.angle < 180) this.angle = this.angle + 5;
    this.drawPosition(this.angle, this.gantryRadius, this.zPostion);
  }
  btnCounterclockwise(): void {
    if (this.angle > 0) this.angle = this.angle - 5;
    this.drawPosition(this.angle, this.gantryRadius, this.zPostion);
  }

  renderPlot(): void {
    let ctx: CanvasRenderingContext2D = this.canvas.nativeElement.getContext("2d");
    let zCtx: CanvasRenderingContext2D = this.zCanvas.nativeElement.getContext("2d");
    let margin = 20;
    let canvasWidth = 600;
    let canvasHeight = (canvasWidth/2) + margin;
    let width = canvasWidth - (2 * margin);
    let height = 400;
    let centerX = canvasWidth / 2;
    let centerY = margin;
    let trackOffset = 25;
    let gantryLocation = 50;
    let trackRadius = width/2;
    let gantryExtension = 10;
    let zMax = 25;
    let zMin = canvasHeight-20;

    this.canvas.nativeElement.setAttribute("width", canvasWidth);
    this.canvas.nativeElement.setAttribute("height", canvasHeight);
    this.zCanvas.nativeElement.setAttribute("height", canvasHeight);
    this.zCanvas.nativeElement.setAttribute("width", 50);

    // z axis
    zCtx.font = "15px Arial";
    zCtx.fillText("MIN",10,canvasHeight-5);
    zCtx.fillText("MAX",10,15);
    zCtx.beginPath();
    zCtx.lineWidth = 2;
    zCtx.moveTo(25,zMin);
    zCtx.lineTo(25,zMax);
    zCtx.stroke();

    // track
    ctx.beginPath();
    ctx.arc(centerX,centerY,width/2,0,Math.PI);
    ctx.fillStyle = '#ffdead';
    ctx.fill();
    ctx.stroke();

    // plot
    ctx.beginPath();
    ctx.arc(centerX,centerY,(width/2)-trackOffset,0,Math.PI);
    ctx.fillStyle = '#CD853F';
    ctx.fill();
    ctx.moveTo(centerX-trackRadius, margin);
    ctx.lineTo(centerX+trackRadius, margin);
    ctx.stroke();

    // center pole
    ctx.beginPath();
    ctx.arc((width+2*margin)/2,margin,10,0,2*Math.PI);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();
    ctx.stroke();
  }

  drawPosition(theta, gantryRadius, zPosition): void {
    let ctx: CanvasRenderingContext2D = this.canvas.nativeElement.getContext("2d");
    let zCtx: CanvasRenderingContext2D = this.zCanvas.nativeElement.getContext("2d");
    let margin = 20;
    let canvasWidth = 600;
    let canvasHeight = (canvasWidth/2) + margin;
    let width = canvasWidth - (2 * margin);
    let height = 400;
    let centerX = canvasWidth / 2;
    let centerY = margin;
    let trackOffset = 25;
    let gantryLocation = 50;
    let trackRadius = width/2;
    let gantryExtension = 10;
    let r = trackRadius+gantryExtension;
    let zMax = 25;
    let zMin = canvasHeight-55;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight); // clear the canvas
    zCtx.clearRect(0, 0, canvasWidth, canvasHeight); // clear the canvas
    this.renderPlot(); // draw the plot

    // arms
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.moveTo(centerX,centerY);
    ctx.lineTo(centerX+r*(Math.cos(Math.PI * theta / 180.0)),centerY+r*(Math.sin(Math.PI * theta / 180.0)));
    ctx.stroke();

    // gantry
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.arc(centerX+gantryRadius*(Math.cos(Math.PI * theta / 180.0)),centerY+gantryRadius*(Math.sin(Math.PI * theta / 180.0)),5,0,2*Math.PI);
    ctx.fillStyle = '#0000FF';
    ctx.fill();
    ctx.stroke();

    // center pole
    ctx.beginPath();
    ctx.arc((width+2*margin)/2,margin,10,0,2*Math.PI);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();
    ctx.stroke();

    // z axis location
    zCtx.fillStyle = "red";
    zCtx.fillRect(12,zMax+(zPosition*zMin),25,10);
  }
}
