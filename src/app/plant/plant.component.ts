import { Component, OnInit } from '@angular/core';

import { PlantService } from './plant.service';
import { Plant } from './plant';

@Component({
  styleUrls: ['./plant.component.css'],
  templateUrl: './plant.component.html',
  providers: [ PlantService ]
})
export class PlantComponent implements OnInit {

  plants: Plant[];

  constructor( private plantService: PlantService ) {  }

  getPlants(): void {
    this.plantService.getPlants()
    .then( ( plants ) => {
      console.log( JSON.stringify( plants ) );
      this.plants = plants;
    } );
  }

  ngOnInit(): void {
    this.getPlants();
  }
}
