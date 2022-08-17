import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthService } from './core/auth.service';
import { CustomersComponent } from './customers/customers.component';

const routes: Routes = [
  {
    path: '',
    canActivateChild: [AuthService],
    children: 
    [
      {path: 'customers-component', component:CustomersComponent},
    ]
  },
  
  {path: 'login-component', component:LoginComponent},
  {path:'signup-component', component:SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
