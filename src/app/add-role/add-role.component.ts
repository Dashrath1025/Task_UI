import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../Services/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.css'],
})
export class AddRoleComponent implements OnInit {
  roleForm: FormGroup;
  msg: string = '';
  roleId: string | undefined | null;
  role: any;
  name: any;

  constructor(
    private api: ApiService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.roleForm = this.fb.group({
      Name: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.roleId = params.get('id');
      if (this.roleId !== undefined && this.roleId!==null) {
        this.api.getRoleId(this.roleId).subscribe((data) => {
          this.role = data;
          this.name = data.name;
          this.roleForm.patchValue({
            Name: this.role.name,
          });
        });
      }
    });
    this.roleList();
  }

  roleList() {
    this.api.getRoleList().subscribe(
      (res) => {
        console.log(res);
      },
      (error) => {
        console.log('something went wrong');
      }
    );
  }

  addRole() {
    if (this.roleForm.valid) {
      const roleData = this.roleForm.value;
      if (this.role && this.role.id) {
        roleData.id = this.role.id;
        this.api.updateRole(roleData).subscribe({
          next: (res: any) => {
            alert(res);
            this.router.navigate(['/manage-role']);
          },
          error: (err) => {
            alert('Something went wrong');
          },
        });
      } else {
        this.api.addrole(roleData).subscribe({
          next: (res: any) => {
            alert('Role Created successfully');
            this.router.navigate(['/manage-role']);
          },
          error: (err) => {
            alert('Something went wrong');
          },
        });
      }
    }
  }
}
