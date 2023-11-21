import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from '../Services/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-update-status',
  templateUrl: './update-status.component.html',
  styleUrls: ['./update-status.component.css'],
})
export class UpdateStatusComponent implements OnInit {
  constructor(
    private api: ApiService,
    private router:Router,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UpdateStatusComponent>,

    @Inject(MAT_DIALOG_DATA) public data: { taskId: number }
  ) {
    this.updateStatus = this.fb.group({
      status: ['', Validators.required],
    });
  }

  userId: string = '';
  taskList: any[] = [];
  statusList: string[]=['Todo','Progress','Completed']
  task: any;
  updateStatus: FormGroup | any;

  ngOnInit(): void {
    console.warn(this.data.taskId);

    this.api.getTaskById(this.data.taskId).subscribe(
      (success) => {
        this.task = success;
        console.log(this.task);
        this.updateStatus.patchValue({
          status: this.task.status,
        });
      },
      (error) => {
        console.log(error);
      }
    );

    this.getTaskByUser();
  }

  getTaskByUser() {
    this.userId = this.api.getTokenUserInfo().id;
    this.api.getTaskByUser(this.userId).subscribe((res) => {
      this.taskList = res;
    });
  }

  onSave() {
    const newStatus = this.updateStatus.value.status;
    this.api.updateStatus(this.data.taskId, newStatus).subscribe(
      (response) => {
        // Handle successful update if needed
        console.log('Status updated successfully', response);

        
        // Show a snackbar notification
        this.snackBar.open('Status updated successfully', 'Close', {
          duration: 3000, // 3 seconds
        });
        
        this.dialogRef.close();
        setTimeout(() => {
          window.location.reload();
        }, 2000);
        

      // Optionally, refresh the page
     // window.location.reload();
      },
      (error) => {
        // Handle error if needed
        console.error('Error updating status', error);

        // Show a snackbar notification for error
        this.snackBar.open('Error updating status', 'Close', {
          duration: 3000, // 3 seconds
        });
      }
    );
  }

  onCancelClick() {
    this.dialogRef.close();
  }
}
