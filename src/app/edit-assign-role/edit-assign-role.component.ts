import { Component, OnInit } from '@angular/core';
import { ApiService } from '../Services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-assign-role',
  templateUrl: './edit-assign-role.component.html',
  styleUrls: ['./edit-assign-role.component.css'],
})
export class EditAssignRoleComponent implements OnInit {
  userId: string | any;
  assignForm: FormGroup | any;
  assign: any;
  rolesList: any[] = [];

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.assignForm = this.fb.group({
      name: [''],
      email: [''],
      role: [''],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.userId = params.get('id');
  
      if (this.userId !== undefined && this.userId !== null) {
        this.api.getUser(this.userId).subscribe((res: any) => {
          this.assign = res;
  
          this.api.getroleName(this.userId).subscribe(
            (roleRes: any) => {
              this.assign.role = roleRes;
              console.log(this.assign.role);
              this.assignForm.patchValue({
                name: this.assign.firstName,
                email: this.assign.email,
                role: this.assign.role,
              });
            },
            (error: any) => {
              console.error('Error in API request:', error);
            }
          );
        });
      }
    });
  
    // Assuming these are methods that populate your rolesList
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
    console.log(formData.role);
    

    this.api.assignUserRole(formData.email, formData.role).subscribe(
      (response) => {
        console.log(response);
        this.openSnackBar(response.message, 'Success');
        this.router.navigate(['/assign-role']);

        // if (response.status===200) {
        //   console.error('assign succesfully');
        //   // Handle the error in the UI, e.g., display an error message to the user
        // } else {
        //   console.log('Error assigning role:', response.error);
        //   // Handle the successful response, e.g., display a success message to the user
        // }
      },
      (error) => {
        this.openSnackBar('Error assigning role:', 'Error');
        //console.error('Error assigning role:', error);
        this.router.navigate(['/assign-role']);

        // Handle the error in the UI, e.g., display an error message to the user
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000, // Set the duration for which the snackbar is displayed
    });
  }
}
