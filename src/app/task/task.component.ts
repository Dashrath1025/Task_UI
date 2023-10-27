import { Component, OnInit } from '@angular/core';
import { ApiService } from '../Services/api.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  
    RoleList: any=[];
    taskForm:FormGroup| any; 
     constructor(private api:ApiService,private fb:FormBuilder,private router:Router){
    this.taskForm=this.fb.group({
      title:[''],
      description: [''],
      duedate:[''],
      status:[''],
      assign:[''],
    })
  }

  ngOnInit(): void {
    this.getTask();
    this.getRoleList();
  }

  getTask(){
    this.api.getTaskList().subscribe({
      next: (res)=> console.log(res),
      error:(err)=>console.log(err)
      
    })
  }

  getRoleList(){
    this.api.getRoles().subscribe(data=>{
      this.RoleList=data;
      console.log(data);
      
    })
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
        AssigneeId: taskData.assign
      };
  
      this.api.addTask(taskObject).subscribe(res => {
        console.log(res);
        alert("Task Assign Successfully")
      });
    }
  }
  


}
