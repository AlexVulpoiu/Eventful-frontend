import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AppSideRegisterComponent } from './register/register.component';
import {OrganiserRegisterComponent} from "./organiser-register/organiser-register.component";

export const AuthenticationRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: AppSideRegisterComponent,
      },
      {
        path: 'organisers/register',
        component: OrganiserRegisterComponent
      }
    ],
  },
];
