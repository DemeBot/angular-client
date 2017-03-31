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
  selectedPlant: Plant;

  constructor( private plantService: PlantService ) {  }

  getPlants(): void {
    this.plantService.getPlants()
    .then( ( plants ) => {
      console.log( JSON.stringify( plants ) );
      this.plants = plants;
      this.selectedPlant=plants[0];

    } );
  }
  onSelect(plant:Plant):void{
    this.selectedPlant=plant;
  }

  ngOnInit(): void {
    this.getPlants();
  }
}

export class plantComponent{
  private basil=require("./../../assets/basil.jpg");
  private mint = require("./../../assets/mint.jpg");
  private tomatoes = require("./../../assets/tomatoes.jpg");
  private cilantro=require("./../../assets/cilantro.jpg");
  private lettuce=require("./../../assets/lettuce.jpg");
  private oregano=require("./../../assets/oregano.jpg");
  constructor(){};
}