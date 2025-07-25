import { Routes } from '@angular/router';
import { AuthLayoutComponent } from "./layout/auth-layout/auth-layout.component";
import { SignInComponent } from "./pages/auth/sign-in/sign-in.component";
import { ContentLayoutComponent } from "./layout/content-layout/content-layout.component";
import { EmployeeListComponent } from "./pages/employee/employee-list/employee-list.component";
import { FormEmployeeComponent } from "./pages/employee/form-employee/form-employee.component";

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
    path: 'employee',
    component: ContentLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: EmployeeListComponent
      },
      {
        path: 'form',
        component: FormEmployeeComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/no-where'
  }
];
