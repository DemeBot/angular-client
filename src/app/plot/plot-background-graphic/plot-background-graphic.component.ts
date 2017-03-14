import {Component, Input, ViewChild, ElementRef, AfterViewInit} from '@angular/core';

import { Plot } from './../plot';

@Component({
  selector: 'app-plot-background',
  styleUrls: ['./plot-background-graphic.component.css'],
  templateUrl: './plot-background-graphic.component.html'
})

export class PlotBackgroudGraphicComponent implements AfterViewInit {
  // Plot dimentions input
  @Input() plot: Plot;

  // Canvas element
  @ViewChild('plotBackgroundGraphicCanvas') canvas: ElementRef;
  // Set on init
  canvasWidth;
  canvasHeight;

  // Margin to show around the image render. Can be provided from directive.
  @Input() margin: number = 10;

  ngAfterViewInit() {
    this.canvasSetup();
    this.renderPlot();
  }

  // Any one time setup for the canvas element
  canvasSetup() {
    // Find and record the required canvas dimentions
    this.canvasWidth = ( this.plot.radius + this.plot.trackWidth + this.margin ) * 2;
    this.canvasHeight = this.plot.radius + this.plot.trackWidth + this.plot.poleRadius + this.margin * 2;

    // Apply sizing to the canvas
    this.canvas.nativeElement.setAttribute( 'width', this.canvasWidth );
    this.canvas.nativeElement.setAttribute( 'height', this.canvasHeight );
  }

  renderPlot() {
    // Get plot centerpoint
    const center = {
      x: this.canvasWidth / 2,
      y: this.plot.poleRadius + this.margin
    }

    // Get HTML Canvas rendering context
    const canvasContext: CanvasRenderingContext2D = this.canvas.nativeElement.getContext( '2d' );

    // Wheel Track
    canvasContext.beginPath();
    canvasContext.arc( center.x, center.y, this.plot.radius + this.plot.trackWidth, 0, this.plot.angle);
    canvasContext.fillStyle = '#ffdead';
    canvasContext.fill();
    canvasContext.moveTo( this.margin, this.plot.poleRadius + this.margin );
    canvasContext.lineTo( this.canvasWidth - this.margin, this.plot.poleRadius + this.margin );
    canvasContext.stroke();

    // Main Plot Bed
    canvasContext.beginPath();
    canvasContext.arc( center.x, center.y, this.plot.radius, 0, this.plot.angle);
    canvasContext.fillStyle = '#CD853F';
    canvasContext.fill();
    canvasContext.moveTo( ( this.canvasWidth / 2 ) - this.plot.radius, center.y );
    canvasContext.lineTo( ( this.canvasWidth / 2 ) + this.plot.radius, center.y );
    canvasContext.stroke();

    // Pivot Column
    canvasContext.beginPath();
    canvasContext.arc( center.x, center.y, this.plot.poleRadius, 0, 2 * Math.PI );
    canvasContext.fillStyle = '#FFFFFF';
    canvasContext.fill();
    canvasContext.stroke();

  }
}
