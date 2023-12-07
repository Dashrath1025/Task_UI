import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { ApiService } from '../Services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { ProfileDialogComponentComponent } from '../profile-dialog-component/profile-dialog-component.component';
import { UpdateStatusComponent } from '../update-status/update-status.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css']
})
export class PageHeaderComponent {
  @Output() menuClicked= new EventEmitter<boolean>();
  userId:string='';
  name:any='';
  constructor(public api:ApiService,public dialog: MatDialog,private router:Router){}


  logOut(){
   this.api.deleteToken();
   this.router.navigate(['/login']);
  }

  openProfileDialog(): void {
    const dialogRef = this.dialog.open(ProfileDialogComponentComponent, {
      width: '350px',
      data: {
        /* Include data if necessary */
      },
    });
    dialogRef.componentInstance.imageUpdated.subscribe(() => {
      console.warn('Image updated!');
      // Update the image source or take any necessary actions
      // For example, fetch the updated user data and set it in your component
    });
  }

  openDialog(taskId:number): void {
    const dialogRef = this.dialog.open(UpdateStatusComponent, {
      data: {taskId},
    });
   

  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }

  

  
}
