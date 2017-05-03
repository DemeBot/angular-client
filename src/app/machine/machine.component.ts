import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { PlotService } from './../plot/plot.service';

import { Plot } from './../plot/plot';
import { PlotContent } from './../plot/plotContent';
import { PlotPosition } from './../plot/plotPositions';

import { MachineState } from './../shared/machine-state';
import { SerialService } from './../shared/serial.service';

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

  ghostState: MachineState = {
    R: this.gantryLocation,
    T: this.angle,
    Z: 0
  }

  state: MachineState = {
    R: 0,
    T: 0,
    Z: 0
  };

  constructor( private serialService: SerialService, private plotService: PlotService ) {  }

  ngOnInit() {
    this.getPositions();
    this.serialService.states.subscribe( state => {
      this.state = state;
    } );
  }

  printPosition( state: MachineState = this.state ): string {
    // console.log( "R:" + state.R + " T:" + state.T + " Z:" + state.Z ) ;
    let position: string = "G00 " + "R" + state.R + " T" + Math.ceil( state.T ) + " Z" + Math.ceil( ( 1 - state.Z ) * this.plot.height );
    return position;
  }

  btnIn( amount: number ): void {
    if ( this.gantryLocation > ( this.plot.poleRadius + this.gantryRadius ) ) this.gantryLocation = this.gantryLocation - amount;
    this.ghostState = { R: this.gantryLocation, T: this.angle, Z: Math.ceil( ( 1 - this.zPostion ) * this.plot.height ) };
  }

  btnOut( amount: number ): void {
    if ( this.gantryLocation < this.plot.radius ) this.gantryLocation = this.gantryLocation + amount;
    this.ghostState = { R: this.gantryLocation, T: this.angle, Z: Math.ceil( ( 1 - this.zPostion ) * this.plot.height ) };
  }

  btnUp( amount: number ): void {
    amount /= this.plot.height;
    if ( ( this.zPostion - amount ) >= this.zMinPosition) this.zPostion = this.zPostion - amount;
    this.ghostState = { R: this.gantryLocation, T: this.angle, Z: Math.ceil( ( 1 - this.zPostion ) * this.plot.height ) };
  }

  btnDown( amount: number ): void {
    amount /= this.plot.height;
    if ( ( this.zPostion + amount ) <= this.zMaxPosition) this.zPostion = this.zPostion + amount;
    this.ghostState = { R: this.gantryLocation, T: this.angle, Z: Math.ceil( ( 1 - this.zPostion ) * this.plot.height ) };
  }

  btnClockwise( amount: number ): void {
    if ( ( this.angle + amount ) <= 180) this.angle = this.angle + amount;
    this.ghostState = { R: this.gantryLocation, T: this.angle, Z: Math.ceil( ( 1 - this.zPostion ) * this.plot.height ) };
  }

  btnCounterclockwise( amount: number ): void {
    if ( ( this.angle - amount ) >= 0) this.angle = this.angle - amount;
    this.ghostState = { R: this.gantryLocation, T: this.angle, Z: Math.ceil( ( 1 - this.zPostion ) * this.plot.height ) };
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
