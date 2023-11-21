import { Component, OnInit } from '@angular/core';
import { ApiService } from '../Services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assign-role',
  templateUrl: './assign-role.component.html',
  styleUrls: ['./assign-role.component.css']
})
export class AssignRoleComponent implements OnInit  {

  constructor(private api:ApiService,private router:Router){}
  
  roleDisplay: any=[];
  displayColumn:string[]=[
    'email',
    'name',
    'role',
    'action'
  ]
  ngOnInit(): void {
    
      this.getAssignRoles();
  }

  getAssignRoles(){
    this.api.getAssignRole().subscribe(res=>{
      console.log(res);
      this.roleDisplay=res;
    },
    (error)=>{
      console.log('something went wrong'); 
    }
    )
  }

   onEdit(id:string){
     this.router.navigate(['/edit-assign-role',id])   
   }


   onLock(id: string, isLocked: boolean) {
    console.log(id);
    this.api.lockUnlock(id).subscribe(
      (res: any) => {
        if (res.message === 'locked') {
          isLocked = true;
          alert('Locked for 1 month successfully');
        } else if (res.message === 'unlocked') {
          isLocked = false;
          alert('Unlocked successfully');
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  
  

}
