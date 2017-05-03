import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';

import { PlotService } from './plot.service';
import { PlotContent } from './plotContent';
import { PlotPosition } from './plotPositions';

import { PlantService } from './../plant/plant.service';
import { Plant } from './../plant/plant';

import { SerialService } from './../shared/serial.service';

import { Plot } from './plot';

@Component({
  selector: 'plot',
  styleUrls: ['./plot.component.css'],
  templateUrl: './plot.component.html',
  providers: [ PlotService, PlantService, SerialService ]
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

  selectedPlot: { position: PlotPosition, content: PlotContent, occupied: boolean };

  selectedValue;

  plants: Plant[];

 constructor( private zone:NgZone, private plotService: PlotService, private plantService: PlantService, private serialService: SerialService ) {  }

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
    position = "DEMOSEED " + "R" + this.selectedPlot.position.r + " T" + Math.ceil( this.selectedPlot.position.t ) + " Z0";
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

 deleteContent( id: number ) {
   this.plotService.deleteContent( id )
   .then( ( content: PlotContent ) => {
     console.log( content );
     this.getContents();
     delete( this.selectedPlot );
   } )
 }

 sendPlantCommand() {
   this.serialService.sendMessage( this.printPosition() );
   this.plotService.addContent( this.selectedValue, this.selectedPlot.position.id )
   .then( ( content ) => {
     console.log( JSON.stringify( content ) );
     this.getContents();
   } )
   .then( () => {
     delete( this.selectedPlot );
     this.zone.run(() => {
            console.log('added a plant');
        });
   } );
 }

 ngOnInit() {
   this.getPositions();
   this.getContents();
   this.getPlants();
 }
}

