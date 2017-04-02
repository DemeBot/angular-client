import { Component, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';

import { Plot } from './../plot/plot';

import { PlotService } from './../plot/plot.service';
import { PlotContent } from './../plot/plotContent';
import { PlotPosition } from './../plot/plotPositions';

@Component({
  selector: 'machine',
  styleUrls: ['./machine.component.css'],
  templateUrl: './machine.component.html',
  providers: [ PlotService ]
})

export class MachineComponent implements OnInit, AfterViewInit {
  @ViewChild("myCanvas") canvas: ElementRef;
  @ViewChild("zCanvas") zCanvas: ElementRef;


  plot: Plot = {
    radius: 500,
    angle: Math.PI,
    height: 1200,
    trackWidth: 90,
    poleRadius: 45
  }

  gantryRadius = 15;

  angle = 0;
  gantryLocation = this.plot.poleRadius + this.gantryRadius;
  gantryMaxRadius = 500;
  zMinPosition = 0;
  zMaxPosition = 1;
  zPostion = this.zMaxPosition;
  
  plotPositions: PlotPosition[];
  selectedPosition: PlotPosition;

  selectedPlot;

  constructor( private plotService: PlotService ) {  }

  ngAfterViewInit() {
    this.renderPlot();
    this.drawPosition(this.angle, this.gantryLocation, this.zPostion);
  }

  ngOnInit() {
    this.getPositions();
  }

  printPosition(){
    console.log( "R:" + this.gantryLocation + " T:" + this.angle + " Z:" + this.zPostion ) ;
    console.log( "G00 " + "R" + this.gantryLocation + " T" + Math.ceil( this.angle ) + " Z" + Math.ceil( ( 1 - this.zPostion ) * this.plot.height ) );
  }

  btnIn( amount: number ): void {
    if ( this.gantryLocation > ( this.plot.poleRadius + this.gantryRadius ) ) this.gantryLocation = this.gantryLocation - amount;
    this.drawPosition(this.angle, this.gantryLocation, this.zPostion);
  }

  btnOut( amount: number ): void {
    if ( this.gantryLocation < this.plot.radius ) this.gantryLocation = this.gantryLocation + amount;
    this.drawPosition(this.angle, this.gantryLocation, this.zPostion);
  }

  btnUp( amount: number ): void {
    amount /= this.plot.height;
    if ( ( this.zPostion - amount ) >= this.zMinPosition) this.zPostion = this.zPostion - amount;
    this.drawPosition(this.angle, this.gantryLocation, this.zPostion);
  }

  btnDown( amount: number ): void {
    amount /= this.plot.height;
    if ( ( this.zPostion + amount ) <= this.zMaxPosition) this.zPostion = this.zPostion + amount;
    this.drawPosition(this.angle, this.gantryLocation, this.zPostion);
  }

  btnClockwise( amount: number ): void {
    if ( ( this.angle + amount ) <= 180) this.angle = this.angle + amount;
    this.drawPosition(this.angle, this.gantryLocation, this.zPostion);
  }

  btnCounterclockwise( amount: number ): void {
    if ( ( this.angle - amount ) >= 0) this.angle = this.angle - amount;
    this.drawPosition(this.angle, this.gantryLocation, this.zPostion);
  }

   getPositions(): void {
   this.plotService.getPositions()
   .then( ( positions ) => {
     // console.log( JSON.stringify( positions ) );
     if ( positions ) {
      this.plotPositions = positions;
      this.selectedPosition = positions[0]; 
     }
   } );
 }

  renderPlot(): void {
    let ctx: CanvasRenderingContext2D = this.canvas.nativeElement.getContext("2d");
    let zCtx: CanvasRenderingContext2D = this.zCanvas.nativeElement.getContext("2d");
    let margin = 10;
    let canvasWidth = ( this.plot.radius + this.plot.trackWidth + margin ) * 2;
    let canvasHeight = ( canvasWidth / 2 ) + margin;
    let width = canvasWidth - ( 2 * margin );
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

    // // track
    // ctx.beginPath();
    // ctx.arc(centerX,centerY,width/2,0,Math.PI);
    // ctx.fillStyle = '#ffdead';
    // ctx.fill();
    // ctx.stroke();

    // // plot
    // ctx.beginPath();
    // ctx.arc(centerX,centerY,(width/2)-trackOffset,0,Math.PI);
    // ctx.fillStyle = '#CD853F';
    // ctx.fill();
    // ctx.moveTo(centerX-trackRadius, margin);
    // ctx.lineTo(centerX+trackRadius, margin);
    // ctx.stroke();

    // // center pole
    // ctx.beginPath();
    // ctx.arc((width+2*margin)/2,margin,10,0,2*Math.PI);
    // ctx.fillStyle = '#FFFFFF';
    // ctx.fill();
    // ctx.stroke();
  }

  drawPosition(theta, gantryLocation, zPosition): void {
    let ctx: CanvasRenderingContext2D = this.canvas.nativeElement.getContext("2d");
    let zCtx: CanvasRenderingContext2D = this.zCanvas.nativeElement.getContext("2d");
    let margin = 10;
    let canvasWidth = ( this.plot.radius + this.plot.trackWidth + margin ) * 2;
    let canvasHeight = (canvasWidth/2) + margin;
    let width = canvasWidth - (2 * margin);
    let height = 400;
    let centerX = canvasWidth / 2;
    let centerY = margin + 45;
    let trackOffset = 25;
    let trackRadius = width/2;
    let gantryExtension = 45;
    let r = this.plot.radius+gantryExtension;
    let zMax = 25;
    let zMin = canvasHeight-55;

    this.printPosition();

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
    ctx.arc(centerX+gantryLocation*(Math.cos(Math.PI * theta / 180.0)),centerY+gantryLocation*(Math.sin(Math.PI * theta / 180.0)), this.gantryRadius, 0, 2*Math.PI);
    ctx.fillStyle = '#0000FF';
    ctx.fill();
    ctx.stroke();

    // center pole
    ctx.beginPath();
    ctx.arc( ( width + 2  *margin ) / 2, centerY, this.plot.poleRadius, 0, 2*Math.PI );
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();
    ctx.stroke();

    // z axis location
    zCtx.fillStyle = "red";
    zCtx.fillRect(12,zMax+(zPosition*zMin),25,10);
  }
}
