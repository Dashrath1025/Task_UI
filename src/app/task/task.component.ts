import { Component, OnInit } from '@angular/core';
import { ApiService } from '../Services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent implements OnInit {
  RoleList: any = [];
  priorityList: string[] = ['Low', 'Medium', 'High']; // Add priority values as needed
  statusList: string[] = ['Todo', 'Progress', 'Completed'];
  taskForm: FormGroup | any;

  constructor(
    private api: ApiService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private snackBar: MatSnackBar
  ) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(20)]],
      duedate: ['', [Validators.required, this.myFilter]],
      status: ['Todo', Validators.required],
      assign: ['', Validators.required],
      priority: ['Medium', Validators.required], // Default to Medium priority
    });
  }

  ngOnInit(): void {
    this.getTask();
    this.getRoleList();
  }

  getTask() {
    this.api.getTaskList().subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err),
    });
  }

  getRoleList() {
    this.api.getRoles().subscribe((data) => {
      this.RoleList = data;
      console.log(data);
    });
  }

  showSuccess() {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }

  myFilter = (d: Date | any): boolean => {
    const currentDate = new Date();

    // Check if 'd' is a Date object
    if (!(d instanceof Date)) {
      // If not, create a new Date object using the provided value
      d = new Date(d);
    }

    // Check if 'd' is a valid Date object
    if (isNaN(d.getTime())) {
      return false; // If not, consider it an invalid date
    }

    currentDate.setHours(0, 0, 0, 0);
    d.setHours(0, 0, 0, 0);

    return d >= currentDate;
  };

  task() {
    if (this.taskForm.valid) {
      const taskData = this.taskForm.value;

      const taskObject = {
        TaskId: 0,
        title: taskData.title,
        description: taskData.description,
        duedate: taskData.duedate,
        status: taskData.status,
        AssigneeId: taskData.assign,
        Priority: taskData.priority,
      };

      this.api.addTask(taskObject).subscribe(
        (res) => {
          // alert("Task Assign Successfully");
          this.openSnackBar('Task Added Success', 'Success');
          this.router.navigate(['/home']);
          console.log(res);
        },
        (Error: any) => {
          console.log(Error);
        }
      );
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000, // Set the duration for which the snackbar is displayed
    });
  }
}
