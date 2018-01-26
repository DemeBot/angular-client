import { Component } from '@angular/core';

import { SerialService } from './shared/serial.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ SerialService ]
})

export class AppComponent {
  title = 'DemeBot';
  footer = 'Team Demeter';
}
