import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../Services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileDialogComponentComponent } from '../profile-dialog-component/profile-dialog-component.component';
import { UpdateStatusComponent } from '../update-status/update-status.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(public dialog: MatDialog,private api:ApiService) {}
  userId:string='';
  taskList:any[]=[];


  ngOnInit(): void {
    this.getTaskByUser();
  }

  openProfileDialog(): void {
    const dialogRef = this.dialog.open(ProfileDialogComponentComponent, {
      width: '350px',
      data: {
        /* Include data if necessary */
      },
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

    getTaskByUser(){
      this.userId=this.api.getTokenUserInfo().id;
      this.api.getTaskByUser(this.userId).subscribe((res)=>{
        this.taskList=res;
      })
    }

    updateStatus(taskId:number,status:string){

    }
}
