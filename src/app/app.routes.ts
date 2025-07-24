import { Routes } from '@angular/router';
import { AuthLayoutComponent } from "./layout/auth-layout/auth-layout.component";
import { SignInComponent } from "./pages/auth/sign-in/sign-in.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/sign-in',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'sign-in',
        pathMatch: 'full'
      },
      {
        path: 'sign-in',
        component: SignInComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/auth/sign-in'
  }
];
