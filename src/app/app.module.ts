import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
  import {HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { JwtModule } from '@auth0/angular-jwt';
import { TaskComponent } from './task/task.component';
import { ManageRoleComponent } from './manage-role/manage-role.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './Material/material.module';
import { AddRoleComponent } from './add-role/add-role.component';
import { AssignRoleComponent } from './assign-role/assign-role.component';
import { EditAssignRoleComponent } from './edit-assign-role/edit-assign-role.component';
import { ProfileDialogComponentComponent } from './profile-dialog-component/profile-dialog-component.component';
import { UpdateStatusComponent } from './update-status/update-status.component';
import { DatePipe } from '@angular/common';
import { PageHeaderComponent } from './page-header/page-header.component';
import { PageFooterComponent } from './page-footer/page-footer.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { ToasterComponent } from './toaster/toaster.component';
import { ToastrModule } from 'ngx-toastr';
import { OrderByDueDatePipe } from './order-by-due-date.pipe';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    TaskComponent,
    ManageRoleComponent,
    AddRoleComponent,
    AssignRoleComponent,
    EditAssignRoleComponent,
    ProfileDialogComponentComponent,
    UpdateStatusComponent,
    PageHeaderComponent,
    PageFooterComponent,
    SideNavComponent,
    ToasterComponent,
    OrderByDueDatePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    JwtModule.forRoot({
      config:{
        tokenGetter:()=>{
          return localStorage.getItem('access_token');
        },
        allowedDomains:['localhost:4200']
      }
    }),
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
