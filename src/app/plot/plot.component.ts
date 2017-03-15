import {Component} from '@angular/core';


@Component({
  selector: 'plot',
  styleUrls: ['./plot.component.css'],
  templateUrl: './plot.component.html'
})

export class PlotComponent {
  selectedPlot;
  plotPositions: any[] = [
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
 onSelect(plot:PlotComponent):void{
    this.selectedPlot=plot;
 }
}

