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
import { PlotBackgroudGraphicComponent } from './plot/plot-background-graphic/plot-background-graphic.component';
import { PlotPositionGraphicComponent } from './plot/plot-position-graphic/plot-position-graphic.component';

import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    MachineComponent,
    PlantComponent,
    PlotComponent,
    PlotBackgroudGraphicComponent,
    PlotPositionGraphicComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule.forRoot(),
    FormsModule,
    HttpModule,
    JsonpModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: false })
  ],
  exports:[
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
