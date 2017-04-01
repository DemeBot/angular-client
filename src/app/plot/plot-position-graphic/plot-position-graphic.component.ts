import { Component, Input, ViewChild, ElementRef, AfterViewInit, OnInit, OnChanges } from '@angular/core';

import { Plot } from './../plot';
import { PlotPosition } from './../plotPositions';

const Snap = require(`imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js`);

@Component({
  selector: 'app-plot-position-graphic',
  styleUrls: ['./plot-position-graphic.component.css'],
  templateUrl: './plot-position-graphic.component.html'
})

export class PlotPositionGraphicComponent implements AfterViewInit, OnInit, OnChanges {
  @Input() plot: Plot;
  @Input() positions: PlotPosition[];
  @Input() selected: PlotPosition;

  // Margin to show around the image render. Can be provided from directive.
  @Input() margin: number = 10;

  // Canvas element
  @ViewChild('plotPositionSvg') canvas: ElementRef;

  private s;
  private plants: any = [];
  private canvasWidth: number;
  private canvasHeight: number;
  private center: { x: number, y: number };

  ngAfterViewInit() {
    this.canvasSetup();
    let bigCircle = this.s.circle( this.center.x, this.center.y, 25 );

    this.updatePositions();

    bigCircle.click( () => {
      console.log("TEST");
    } );

    bigCircle.attr({
      fill: "#bada55",
      stroke: "#000",
      strokeWidth: 5
    });
  }

  ngOnChanges() {
    this.updatePositions();
  }

  updatePositions(){
    this.plants.forEach( ( plant ) => {
      plant.remove();
    } );
    if ( this.positions )
    this.positions.forEach( ( position: PlotPosition ) => {
      let angle = position.t * Math.PI / 180.0;
      let x_pos = Math.cos( angle ) * position.r;
      let y_pos = Math.sin( angle ) * position.r;
      let size: number = 50;
      let color: string = "green";

      if ( this.selected ) {
        if ( this.selected.id === position.id ) {
          size = 75;
          color = "limegreen";
        }
      }

      let plant = this.s.circle(this.center.x + x_pos, this.center.y + y_pos, size);

      this.plants.push(plant);

      plant.attr({
        fill: color,
        stroke: "#000",
        strokeWidth: 5
      });
      
      plant.click( ( event ) => {
        console.log( position.id );
      } );
      // console.log( "id: " + position.id );
      // console.log( Math.cos( angle ) );
      // console.log( "angle: " + position.t );
    });
  }

  ngOnInit() {
    this.s = Snap(document.getElementsByClassName('plotPositionSvg')[0]);
  }

  // Any one time setup for the canvas element
  canvasSetup() {
    // Find and record the required canvas dimentions
    this.canvasWidth = ( this.plot.radius + this.plot.trackWidth + this.margin ) * 2;
    this.canvasHeight = this.plot.radius + this.plot.trackWidth + this.plot.poleRadius + this.margin * 2;

    // Apply sizing to the canvas
    this.canvas.nativeElement.setAttribute( 'width', this.canvasWidth );
    this.canvas.nativeElement.setAttribute( 'height', this.canvasHeight );


    // Get plot centerpoint
    this.center = {
      x: this.canvasWidth / 2 + 50,
      y: this.plot.poleRadius + this.margin + 20
    }
  }
}
