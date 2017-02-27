import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { rootRouterConfig } from './app.routes';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { MachineComponent } from './machine/machine.component';
import { PlantComponent } from './plant/plant.component';
import { PlotComponent } from './plot/plot.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    MachineComponent,
    PlantComponent,
    PlotComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: false })
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
