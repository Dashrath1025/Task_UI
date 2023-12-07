import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../Services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileDialogComponentComponent } from '../profile-dialog-component/profile-dialog-component.component';
import { UpdateStatusComponent } from '../update-status/update-status.component';
import { Observable } from 'rxjs';
import { sortItem } from '../Model/model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(public dialog: MatDialog, private api: ApiService) {}
  userId: string = '';
  taskList: any[] = [];
  duedate: Date | any;
  status: string = '';
  searchResult: any[] = [];
  statusList: string[] = ['Todo', 'Progress', 'Completed'];
  searchPerformed: boolean = false;
  sortByDueDateClicked = false;

  sortList: sortItem[] = [];

  ngOnInit(): void {
    this.getTaskByUser();
    // this.isDueDateTodayOrTomorrow(this.duedate);
  }

  myFilter = (d: Date | any): boolean => {
    const currentDate = new Date();

    if (!(d instanceof Date)) {
      d = new Date(d);
    }

    if (isNaN(d.getTime())) {
      return false; 
    }

    currentDate.setHours(0, 0, 0, 0);
    d.setHours(0, 0, 0, 0);

    return d >= currentDate;
  };

  openDialog(taskId: number): void {
    const dialogRef = this.dialog.open(UpdateStatusComponent, {
      data: { taskId },
    });
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }

  getTaskByUser() {
    this.userId = this.api.getTokenUserInfo().id;
    this.api.getTaskByUser(this.userId).subscribe((res) => {
      this.taskList = res;
    });
  }

  onSearch(): void {
    this.searchPerformed = true;
    this.userId = this.api.getTokenUserInfo().id;
    this.api.searchTasks(this.duedate, this.status, this.userId).subscribe(
      (tasks) => {
        this.searchResult = tasks;
        // Check for the length of searchResult here
        if (this.searchResult.length === 0) {
          // Set searchResult to an empty array to ensure no tasks are displayed
          this.searchResult = [];
          // Display a message or perform any other action when no data is found
          console.log('No data found for the specified filters.');
        }
      },
      (error) => {
        // Handle the error as needed
        console.error('Error fetching tasks:', error);

        // Check if the error status is 404 (Not Found)
        if (error.status === 404) {
          // Set searchResult to an empty array to ensure no tasks are displayed
          this.searchResult = [];
          // Display a message or perform any other action when no data is found
          console.log('No data found for the specified filters.');
        }
      }
    );
  }

  checkDueDate(task: any): void {
    const dueDate = task.dueDate;

    if (!dueDate) {
      return;
    }

    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const taskDueDate = new Date(dueDate);

    if (isNaN(taskDueDate.getTime())) {
      // Invalid date format, handle accordingly
      return;
    }

    if (taskDueDate.toDateString() === today.toDateString()) {
    //  this.showToast('Task is due today!', 'error');
      alert('Task is due today!: error')
    } else if (taskDueDate.toDateString() === tomorrow.toDateString()) {
     // this.showToast('Task is due tomorrow!', 'warning');
      alert('Task is due tomorrow!: error')

    }
  }

 
  sortListByDueDate() {
   // this.sortList = [...this.taskList];
    this.sortList = this.taskList.slice();

    this.sortList.sort((a, b) => {
      const dateA = new Date(a.dueDate);
      const dateB = new Date(b.dueDate);
      return dateA.getTime() - dateB.getTime();
    });

    this.sortByDueDateClicked = true;
  }


  onClear() {
    this.searchPerformed = false;
   
    this.userId = this.api.getTokenUserInfo().id;
    this.api.clearTasks(this.userId).subscribe(
      (result) => {
        this.searchResult = result;
      },
      (error) => {
        console.error('Error clearing tasks:', error);
      }
    );
  }
}
