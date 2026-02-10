// Route configuration:
// - We keep it simple and render the Signup component at the root path.
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ConfigurationComponent } from './configuration/configuration.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'configuration',
    component: ConfigurationComponent,
  },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
];
