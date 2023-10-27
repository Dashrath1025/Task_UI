import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthenticationGuard } from './Guard/authentication-guard.guard';
import { AuthorizationGuard } from './Guard/authorization.guard';
import { TaskComponent } from './task/task.component';
import { ManageRoleComponent } from './manage-role/manage-role.component';
import { AddRoleComponent } from './add-role/add-role.component';

const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'task',component:TaskComponent},
  {path:'manage-role',component:ManageRoleComponent},
  {path:'add-role',component:AddRoleComponent},
  {path:'add-role/:id',component:AddRoleComponent},

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
