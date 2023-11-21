import { Component, OnInit } from '@angular/core';
import { ApiService } from '../Services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  
  RoleList: any = [];
  priorityList: string[] = ['Low', 'Medium', 'High']; // Add priority values as needed
  statusList: string[]=['Todo','Progress','Completed']
  taskForm: FormGroup | any;

  constructor(private api: ApiService, private fb: FormBuilder, private router: Router) {
    this.taskForm = this.fb.group({
      title: ['',Validators.required],
      description: [''],
      duedate: ['',this.validateDueDate],
      status: ['Todo'],
      assign: [''],
      priority: ['Medium'] // Default to Medium priority
    });
  }

  ngOnInit(): void {
    this.getTask();
    this.getRoleList();
  }

  getTask() {
    this.api.getTaskList().subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err)
    });
  }

  getRoleList() {
    this.api.getRoles().subscribe(data => {
      this.RoleList = data;
      console.log(data);
    });
  }

  validateDueDate(control: any) {
    const selectedDate = new Date(control.value);
    const currentDate = new Date();

    return selectedDate >= currentDate ? null : { 'invalidDueDate': true };
  }

  // Function to determine whether a date is selectable
  isDateSelectable(date: Date): boolean {
    const currentDate = new Date();
    // Allow selection of dates in the future
    return date >= currentDate;
  }

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
        Priority: taskData.priority
      };

      this.api.addTask(taskObject).subscribe(res => {
        alert("Task Assign Successfully");
        console.log(res);
      });
    }
  }

  isDateInPast(date: Date): boolean {
    const currentDate = new Date();
    return date < currentDate;
  }

  // Function to apply custom styles to calendar cells
  dateClass = (date: Date): MatCalendarCellCssClasses => {
    return this.isDateInPast(date) ? 'custom-past-date' : '';
  }
}
