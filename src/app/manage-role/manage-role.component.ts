import { Component, OnInit } from '@angular/core';
import { ApiService } from '../Services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-manage-role',
  templateUrl: './manage-role.component.html',
  styleUrls: ['./manage-role.component.css'],
})
export class ManageRoleComponent implements OnInit {
  constructor(
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  msg:string='';
  isNewStudent = false;
  roleDisplay: any = [];
  roleId: string | null | undefined;
  displayColumns: string[] = ['id', 'name', 'edit'];
  ngOnInit(): void {
    // this.route.paramMap.subscribe((params) => {
    //   this.roleId = params.get('id');
    //   if (this.roleId) {
    //     if (this.roleId.toLowerCase() === 'addrole'.toLowerCase()) {
    //       this.isNewStudent = true;
    //     } else {
    //       this.isNewStudent = false;
    //       this.api.getRoleId(this.roleId).subscribe(
    //         (success) => {
    //           console.log(success);
    //         },
    //         (error) => {
    //           console.log(error);
    //         }
    //       );
    //     }
    //   }
    // });

    this.roleList();
  }

  roleList() {
    this.api.getRoleList().subscribe(
      (res) => {
        this.roleDisplay = res;
        console.log(res);
      },
      (error) => {
        console.log('something went wrong');
      }
    );
  }

  onEdit(id:string)
   {
    this.router.navigate(['/add-role',id])
  }

  onDelete(id:string){
    let request=confirm('Are you sure want to delete this Role?');

    if(request){
      this.api.deleteRole(id).subscribe(res=>{
        
        this.msg=res;
        alert(this.msg);
        this.roleList();
        // if(res){
        //   alert("Role Delete Success");
        //   this.roleList();
        // }
        // else{
        //   alert("role can not delete,because assign this role already")
        // }
      },
      error=>{
          console.log(error);
          alert(error.error)
      }
      )
    }
  }
}
