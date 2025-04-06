import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { EmployeeListComponent } from './pages/employee-list/employee-list.component';
import { ViewEmployeeComponent } from './pages/view-employee/view-employee.component';
import { UpdateEmployeeComponent} from './pages/update-employee/update-employee.component';
import { AddEmployeeComponent } from './pages/add-employee/add-employee.component';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'employees', component: EmployeeListComponent },
  { path: 'employee/:id', component: ViewEmployeeComponent },       // 🔜
{ path: 'update-employee/:id', component: UpdateEmployeeComponent }, // 🔜
{ path: 'add-employee', component: AddEmployeeComponent },


  
];
