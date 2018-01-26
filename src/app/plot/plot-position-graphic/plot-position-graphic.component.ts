import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit, OnInit, OnChanges } from '@angular/core';

import { Plot } from './../plot';
import { PlotPosition } from './../plotPositions';
import { PlotContent } from './../plotContent';

const Snap = require(`imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js`);

@Component({
  selector: 'app-plot-position-graphic',
  styleUrls: [ './plot-position-graphic.component.css' ],
  templateUrl: './plot-position-graphic.component.html'
})

export class PlotPositionGraphicComponent implements AfterViewInit, OnInit, OnChanges {
  @Input() plot: Plot;
  @Input() inputPositions: PlotPosition[];
  @Input() inputContents: PlotContent[];
  @Input() selected: { position: PlotPosition, content?: PlotContent, occupied: Boolean };


  @Output() plotClick = new EventEmitter();
  @Output() clear = new EventEmitter();



  // Margin to show around the image render. Can be provided from directive.
  @Input() margin: number = 10;

  // Canvas element
  @ViewChild('plotPositionSvg') canvas: ElementRef;

  private positions: { position: PlotPosition, content?: PlotContent, occupied: Boolean }[] = [];

  private s;
  private plantGraphicsArray: any = [];
  private canvasWidth: number;
  private canvasHeight: number;
  private center: { x: number, y: number };
  private scaleFactor: number;

  ngAfterViewInit() {
    this.canvasSetup();
    this.updatePositions();
  }

  ngOnChanges() {
    this.updatePositions();
    this.updateGraphic();
  }

  updatePositions() {
    this.plantGraphicsArray.forEach( ( plantGraphic ) => {
      plantGraphic.remove();
    } );

    if ( this.inputPositions ) {
      this.inputPositions.forEach( ( inputPosition ) => {

        const position: { position: PlotPosition, content?: PlotContent, occupied: Boolean } = {
          position: inputPosition,
          content: null,
          occupied: false
        }

        if ( this.inputContents ) {
          this.inputContents.forEach( ( inputContent ) => {
            if ( inputContent.PLOT_POSITIONS_id === inputPosition.id ) {
              position.content = inputContent;
              position.occupied = true;
            }
          } );
        }

        this.positions.push( position );
      } )
    }
  }

  updateGraphic() {

    if ( this.positions ) {
      this.positions.forEach( ( position ) => {
        let angle = position.position.t * Math.PI / 180.0;
        let x_pos = Math.cos( angle ) * position.position.r * this.scaleFactor;
        let y_pos = Math.sin( angle ) * position.position.r * this.scaleFactor;
        let size: number = 25;

        let color: string = this.inputContents ? "grey" : "lightblue";

        if ( this.inputContents ) {
          this.inputContents.forEach( ( content ) => {
            if ( content.PLOT_POSITIONS_id === position.position.id ) {
              color = "green";
            }
          } );
        }

        if ( this.selected ) {
          if ( this.selected.position.id === position.position.id ) {
            size = 35;
            if ( this.inputContents ) {
              this.inputContents.forEach( ( content ) => {
                if ( content.PLOT_POSITIONS_id === position.position.id ) {
                  color = "limegreen";
                }
              } );
            }
          }
        }

        let plant = this.s.circle(this.center.x + x_pos, this.center.y + y_pos + this.margin * 1 / this.scaleFactor, size * this.scaleFactor);

        this.plantGraphicsArray.push(plant);

        plant.attr({
          fill: color,
          stroke: "#000",
          strokeWidth: 5
        });
        
        plant.click( ( event ) => {
          console.log( "id: " + position.position.id + " R:" + position.position.r + " Theta:" + position.position.t );
          console.log( JSON.stringify( position ) );
          this.plotClick.emit( position );
        } );
      } );
    }
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
