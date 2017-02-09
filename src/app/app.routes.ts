import { Routes } from '@angular/router';

import { AboutComponent } from './about/about.component';
import { MachineComponent } from './machine/machine.component';
import { PlantComponent } from './plant/plant.component';
import { PlotComponent } from './plot/plot.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const rootRouterConfig: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'about', component: AboutComponent },
  { path: 'machine', component: MachineComponent },
  { path: 'plant', component: PlantComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'plot', component: PlotComponent }
];
