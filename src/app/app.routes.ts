// Route configuration:
// - We keep it simple and render the Signup component at the root path.
import { Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';

export const routes: Routes = [
  {
    path: '',
    component: SignupComponent,
  },
];
