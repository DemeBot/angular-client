import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit, OnInit, OnChanges } from '@angular/core';

import { Plot } from './../../plot/plot';
import { MachineState } from './../../shared/machine-state';

const Snap = require(`imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js`);

@Component({
  selector: 'app-machine-state-graphic',
  styleUrls: ['./machine-state-graphic.component.css'],
  templateUrl: './machine-state-graphic.component.html'
})

export class MachineStateGraphicComponent implements AfterViewInit, OnInit, OnChanges {
  @Input() plot: Plot;
  @Input() state: MachineState = { R:0, T:0, Z:0 };

  // Margin to show around the image render. Can be provided from directive.
  @Input() margin: number = 10;

  // Canvas element
  @ViewChild('machineStateSvg') canvas: ElementRef;

  private s;
  private canvasWidth: number;
  private canvasHeight: number;
  private center: { x: number, y: number };
  private scaleFactor: number;

  private beamWidth = 10;

  ngAfterViewInit() {
    this.canvasSetup();
    this.updateSVG();
  }

  ngOnChanges() {
    if ( this.s ) {
      this.s.clear();
      this.updateSVG();
    }
  }

  drawCenterPole( s = this.s ){
    let centerPole = s.circle(this.center.x, this.center.y , this.plot.poleRadius * this.scaleFactor);
    centerPole.attr({
        fill: "#fff",
        stroke: "#000",
        strokeWidth: 2.5
      });
  }

  drawArms( angle: number, s = this.s ) {
    let armsLength = ( this.plot.radius + this.plot.poleRadius * 2 ) * this.scaleFactor;
    let arm_L = s.rect( this.center.x - ( ( this.plot.poleRadius + this.beamWidth ) * this.scaleFactor ), this.center.y + ( ( this.plot.poleRadius ) * this.scaleFactor ), armsLength, this.beamWidth * this.scaleFactor );
    let arm_R = s.rect( this.center.x - ( ( this.plot.poleRadius + this.beamWidth ) * this.scaleFactor ), this.center.y - ( ( this.plot.poleRadius + this.beamWidth ) * this.scaleFactor ), armsLength, this.beamWidth * this.scaleFactor );
    let arm_E = s.rect( armsLength + this.center.x - ( ( this.plot.poleRadius + this.beamWidth ) * this.scaleFactor ), this.center.y - ( ( this.plot.poleRadius + this.beamWidth ) * this.scaleFactor ), this.beamWidth * this.scaleFactor, ( this.plot.poleRadius + this.beamWidth ) * 2 * this.scaleFactor );
    
    let armAttr = {
      fill: "#ccc",
      stroke: "#000",
      strokeWidth: 2.5,
      transform: "rotate( " + angle + "," + this.center.x + "," + this.center.y + ")"
    }
    arm_L.attr(armAttr);
    arm_R.attr(armAttr);
    arm_E.attr(armAttr);
  }

  drawGantry( angle: number, rDist: number, s = this.s ) {
    let length = 100;
    let width = 100;
    let wheelBaseInset = 10;

    let gantry_L = s.rect( rDist * this.scaleFactor + this.center.x - ( width / 2  * this.scaleFactor ), this.center.y - ( ( length / 2 ) * this.scaleFactor ), length * this.scaleFactor, 10 * this.scaleFactor );
    let gantry_R = s.rect( rDist * this.scaleFactor + this.center.x - ( width / 2  * this.scaleFactor ), this.center.y + ( ( length / 2 - 10 ) * this.scaleFactor ), length * this.scaleFactor, 10 * this.scaleFactor );

    let gantry_Center = s.circle( rDist * this.scaleFactor + this.center.x, this.center.y, 20 * this.scaleFactor );

    let gantry = s.group( gantry_L, gantry_R, gantry_Center );
    
    gantry_Center.attr({
      fillOpacity: 0,
      stroke: "blue",
      strokeWidth: 5
    });

    gantry_L.attr({
      fill: "blue",
      stroke: "#000",
      strokeWidth: 2
    });

    gantry_R.attr({
      fill: "blue",
      stroke: "#000",
      strokeWidth: 2
    });

    gantry.attr({
      transform: "rotate( " + angle + "," + this.center.x + "," + this.center.y + ")"
    });
  }

  updateSVG(){
    //this.drawCenterPole();
    this.drawArms( this.state.T );
    this.drawGantry( this.state.T, this.state.R );
  }

  ngOnInit() {
    this.s = Snap(this.canvas.nativeElement);
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

    // this.s.click( ( event ) => {
    //   // console.log( event );
    //   console.log( this.s.getBBox() );
    //   console.log( "X:" + event.layerX   + " Y:" + event.layerY );
    // } );

    // // Set up blackground
    // this.s.rect(0,0,2000,1000)
    // .attr( {
    //   fillOpacity: 0.0
    // } )
    // .click( ( event ) => {
    //   console.log( event );
    //   console.log( "X:" + event.layerX  + " Y:" + event.layerY );
    // } );


    // Get plot centerpoint
    this.center = {
      x: 1000,
      y: 40 + this.margin * 1 / this.scaleFactor
    }
  }
}
