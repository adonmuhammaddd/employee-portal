import { Routes } from '@angular/router';
import { AuthLayoutComponent } from "./layout/auth-layout/auth-layout.component";
import { SignInComponent } from "./pages/auth/sign-in/sign-in.component";
import { ContentLayoutComponent } from "./layout/content-layout/content-layout.component";
import { EmployeeListComponent } from "./pages/employee/employee-list/employee-list.component";
import { FormEmployeeComponent } from "./pages/employee/form-employee/form-employee.component";
import { AuthGuard } from "./guards/auth.guard";
import { ReverseAuthGuard } from "./guards/reverse-auth.guard";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    canActivate: [ReverseAuthGuard],
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
    canActivate: [AuthGuard],
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
