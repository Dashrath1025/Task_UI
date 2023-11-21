import { Component, OnInit } from '@angular/core';
import { ApiService } from '../Services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-assign-role',
  templateUrl: './edit-assign-role.component.html',
  styleUrls: ['./edit-assign-role.component.css'],
})
export class EditAssignRoleComponent implements OnInit {
  userId: string | any ;
  assignForm: FormGroup;
  assign: any;
  rolesList: any[] = [];

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.assignForm = this.fb.group({
      name: [''],
      email: [''],
      role: ['']
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.userId = params.get('id');

      if (this.userId !== undefined && this.userId !== null) {
        this.api.getUser(this.userId).subscribe((res:any) => {
          this.assign = res;
            //console.log(this.assign.role);
            
          console.log(res);

          // this.api.getroleName(this.userId).subscribe((res:any)=>{
          //   this.assign.role=res;
          //   console.log(this.assign.role);
          // })

          this.assignForm.patchValue({
            name: this.assign.firstName,
            email: this.assign.email,
            role:this.assign.role
          });
        });
      }
    });
    this.getAssignRoles();
    this.roleList();
  }

  roleList() {
    this.api.getRoleList().subscribe(
      (res) => {
        this.rolesList = res;
        console.log(res);
      },
      (error) => {
        console.log('something went wrong');
      }
    );
  }

  getAssignRoles() {
    this.api.getAssignRole().subscribe(
      (res) => {},
      (error) => {
        console.log('something went wrong');
      }
    );
  }

  assignRole() {
    const formData = this.assignForm.value;
    const selectedRole = this.rolesList.find(role => role.id === formData.role);
    const roleName = selectedRole ? selectedRole.name : '';

    this.api.assignUserRole(formData.email, roleName).subscribe(
      response => {
        if (response && response.error) {
          console.error('Error assigning role:', response.error);
          // Handle the error in the UI, e.g., display an error message to the user
        } else {
          console.log('Role assigned successfully:', response);
          // Handle the successful response, e.g., display a success message to the user
        }
      },
      error => {
        console.error('Error assigning role:', error);
        this.router.navigate(['/assign-role'])

        // Handle the error in the UI, e.g., display an error message to the user
      }
    );
    
  }
  
}
