import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { PlotService } from './plot.service';
import { PlotContent } from './plotContent';
import { PlotPosition } from './plotPositions';

import { PlantService } from './../plant/plant.service';
import { Plant } from './../plant/plant';

import { Plot } from './plot';

@Component({
  selector: 'plot',
  styleUrls: ['./plot.component.css'],
  templateUrl: './plot.component.html',
  providers: [ PlotService, PlantService ]
})

export class PlotComponent implements OnInit {

  plot: Plot = {
    radius: 550,
    angle: Math.PI,
    height: 1200,
    trackWidth: 90,
    poleRadius: 45
  }

  plotPositions: PlotPosition[];
  plotContents: PlotContent[];

  selectedPlot;

  selectedValue;

  plants: Plant[];

 constructor( private plotService: PlotService, private plantService: PlantService ) {  }

 getPositions(): void {
   this.plotService.getPositions()
   .then( ( positions ) => {
     // console.log( JSON.stringify( positions ) );
     if ( positions ) {
      this.plotPositions = positions;
     }
   } );
 }

 getContents(): void {
   this.plotService.getContents()
   .then( ( contents ) => {
     this.plotContents = contents;
     console.log( JSON.stringify( contents ) );
   } );
 }

 clearSelection(): void {
   delete( this.selectedPlot );
 }

  getPlants(): void {
    this.plantService.getPlants()
    .then( ( plants ) => {
      console.log( JSON.stringify( plants ) );
      this.plants = plants;
    } );
  }

 onSelect( plot: { position: PlotPosition, content: PlotContent, occupied: boolean }  ): void {
   if ( this.selectedPlot === plot )
      delete(  this.selectedPlot );
   else
      this.selectedPlot=plot;
 }

 printPosition(){
   let position: string;
   if ( this.selectedPlot ) {
    position = "G00 " + "R" + this.selectedPlot.position.r + " T" + Math.ceil( this.selectedPlot.position.t ) + " Z" + Math.ceil( ( 1 - this.selectedPlot.position.z ) * this.plot.height );
   }
   else {
     position="";
   }
   return position;
 }

 getPlant( id: number ): Plant {
   let returnPlant = null;
   this.plants.forEach( ( plant ) => {
     if ( plant.id === id ) {
       returnPlant = plant;
     }
   } );
   return returnPlant;
 }

 ngOnInit() {
   this.getPositions();
   this.getContents();
   this.getPlants();
 }
}

