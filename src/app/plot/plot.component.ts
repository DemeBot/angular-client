import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { PlotService } from './plot.service';
import { PlotContent } from './plotContent';
import { PlotPosition } from './plotPositions';

import { Plot } from './plot';

@Component({
  selector: 'plot',
  styleUrls: ['./plot.component.css'],
  templateUrl: './plot.component.html',
  providers: [ PlotService ]
})

export class PlotComponent implements OnInit {

  plot: Plot = {
    radius: 500,
    angle: Math.PI,
    height: 1200,
    trackWidth: 90,
    poleRadius: 45
  }

  plotPositions: PlotPosition[];
  selectedPosition: PlotPosition;

  selectedPlot;

  mockPlotPositions: any[] = [
   { pos: 1, r: 200, t: 0, z: 0 },
   { pos: 2, r: 200, t: 45, z: 0 },
   { pos: 3, r: 200, t: 90, z: 0 },
   { pos: 4, r: 200, t: 135, z: 0 },
   { pos: 5, r: 200, t: 180, z: 0 },
   { pos: 6, r: 400, t: 0, z: 0 },
   { pos: 7, r: 400, t: 23, z: 0 },
   { pos: 8, r: 400, t: 45, z: 0 },
   { pos: 9, r: 400, t: 68, z: 0 },
   { pos: 10, r: 400, t: 90, z: 0 },
   { pos: 11, r: 400, t: 113, z: 0 },
   { pos: 12, r: 400, t: 135, z: 0 },
   { pos: 13, r: 400, t: 158, z: 0 },
   { pos: 14, r: 400, t: 180, z: 0 },
 ]

 constructor( private plotService: PlotService ) {  }

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

 clearSelection(): void {
   delete( this.selectedPlot );
 }

 onSelect(plot:PlotComponent): void{
   if ( this.selectedPlot === plot )
      delete(  this.selectedPlot );
   else
      this.selectedPlot=plot;
 }

 ngOnInit() {
   this.getPositions();
 }
}

