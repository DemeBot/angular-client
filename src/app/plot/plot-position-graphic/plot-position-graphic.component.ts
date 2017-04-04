import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit, OnInit, OnChanges } from '@angular/core';

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

  @Output() plotClick = new EventEmitter();
  @Output() clear = new EventEmitter();

  // Margin to show around the image render. Can be provided from directive.
  @Input() margin: number = 10;

  // Canvas element
  @ViewChild('plotPositionSvg') canvas: ElementRef;

  private s;
  private plants: any = [];
  private canvasWidth: number;
  private canvasHeight: number;
  private center: { x: number, y: number };
  private scaleFactor: number;

  ngAfterViewInit() {
    this.canvasSetup();
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
      let x_pos = Math.cos( angle ) * position.r * this.scaleFactor;
      let y_pos = Math.sin( angle ) * position.r * this.scaleFactor;
      let size: number = 25;
      let color: string = "green";

      if ( this.selected ) {
        if ( this.selected.id === position.id ) {
          size = 35;
          color = "limegreen";
        }
      }

      let plant = this.s.circle(this.center.x + x_pos, this.center.y + y_pos + this.margin * 1 / this.scaleFactor, size * this.scaleFactor);

      this.plants.push(plant);

      plant.attr({
        fill: color,
        stroke: "#000",
        strokeWidth: 5
      });
      
      plant.click( ( event ) => {
        console.log( "id: " + position.id + " R:" + position.r + " Theta:" + position.t );
        this.plotClick.emit( position );
      } );
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

    // Set a scale factor
    this.scaleFactor = 2000/this.canvasWidth;

    // Apply sizing to the canvas
    this.canvas.nativeElement.setAttribute( 'width', this.canvasWidth );
    this.canvas.nativeElement.setAttribute( 'height', this.canvasHeight );

    // Set up blackground
    this.s.rect(0,0,2000,1000)
    .attr( {
      fillOpacity: 0.0
    } )
    .click( ( event ) => {
      this.clear.emit();
    } );

    // Get plot centerpoint
    this.center = {
      x: 1000,
      y: 45
    }
  }
}
