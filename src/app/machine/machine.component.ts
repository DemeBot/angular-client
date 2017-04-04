import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';

import { PlotService } from './../plot/plot.service';

import { Plot } from './../plot/plot';
import { PlotContent } from './../plot/plotContent';
import { PlotPosition } from './../plot/plotPositions';

import { MachineState } from './machine-state-graphic/machine-state';

@Component({
  selector: 'machine',
  styleUrls: ['./machine.component.css'],
  templateUrl: './machine.component.html',
  providers: [ PlotService ]
})

export class MachineComponent implements OnInit {

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

  state: MachineState = {
    R: this.gantryLocation,
    T: this.angle,
    Z: 0
  }

  constructor( private plotService: PlotService ) {  }

  ngOnInit() {
    this.getPositions();
  }

  printPosition(){
    console.log( "R:" + this.gantryLocation + " T:" + this.angle + " Z:" + this.zPostion ) ;
    console.log( "G00 " + "R" + this.gantryLocation + " T" + Math.ceil( this.angle ) + " Z" + Math.ceil( ( 1 - this.zPostion ) * this.plot.height ) );
  }

  btnIn( amount: number ): void {
    if ( this.gantryLocation > ( this.plot.poleRadius + this.gantryRadius ) ) this.gantryLocation = this.gantryLocation - amount;
    this.state = { R: this.gantryLocation, T: this.angle, Z: Math.ceil( ( 1 - this.zPostion ) * this.plot.height ) };
  }

  btnOut( amount: number ): void {
    if ( this.gantryLocation < this.plot.radius ) this.gantryLocation = this.gantryLocation + amount;
    this.state = { R: this.gantryLocation, T: this.angle, Z: Math.ceil( ( 1 - this.zPostion ) * this.plot.height ) };
  }

  btnUp( amount: number ): void {
    amount /= this.plot.height;
    if ( ( this.zPostion - amount ) >= this.zMinPosition) this.zPostion = this.zPostion - amount;
    this.state = { R: this.gantryLocation, T: this.angle, Z: Math.ceil( ( 1 - this.zPostion ) * this.plot.height ) };
  }

  btnDown( amount: number ): void {
    amount /= this.plot.height;
    if ( ( this.zPostion + amount ) <= this.zMaxPosition) this.zPostion = this.zPostion + amount;
    this.state = { R: this.gantryLocation, T: this.angle, Z: Math.ceil( ( 1 - this.zPostion ) * this.plot.height ) };
  }

  btnClockwise( amount: number ): void {
    if ( ( this.angle + amount ) <= 180) this.angle = this.angle + amount;
    this.state = { R: this.gantryLocation, T: this.angle, Z: Math.ceil( ( 1 - this.zPostion ) * this.plot.height ) };
  }

  btnCounterclockwise( amount: number ): void {
    if ( ( this.angle - amount ) >= 0) this.angle = this.angle - amount;
    this.state = { R: this.gantryLocation, T: this.angle, Z: Math.ceil( ( 1 - this.zPostion ) * this.plot.height ) };
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
}
