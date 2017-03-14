import {Component} from '@angular/core';

import { Plot } from './plot';

@Component({
  selector: 'plot',
  styleUrls: ['./plot.component.css'],
  templateUrl: './plot.component.html'
})

export class PlotComponent {
  plot: Plot = {
    radius: 600,
    angle: Math.PI,
    height: 1200,
    trackWidth: 90,
    poleRadius: 45
  }
}
