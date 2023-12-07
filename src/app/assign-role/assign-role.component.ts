import { Component, OnInit } from '@angular/core';
import { ApiService } from '../Services/api.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-assign-role',
  templateUrl: './assign-role.component.html',
  styleUrls: ['./assign-role.component.css'],
})
export class AssignRoleComponent implements OnInit {
  constructor(
    private api: ApiService,
    private router: Router,
    private datePipe: DatePipe,
    private snackBar: MatSnackBar
  ) {}

  roleDisplay: any = [];
  displayColumn: string[] = ['email', 'name', 'role', 'action'];
  ngOnInit(): void {
    this.getAssignRoles();
  }

  getAssignRoles() {
    this.api.getAssignRole().subscribe(
      (res) => {
        console.log(res);
        this.roleDisplay = res;
      },
      (error) => {
        console.log('something went wrong');
      }
    );
  }

  onEdit(id: string) {
    this.router.navigate(['/edit-assign-role', id]);
  }

  onLock(id: string) {
    console.log(id);
    this.api.lockUnlock(id).subscribe(
      (res: any) => {
        if (res.message === 'locked') {
          this.openSnackBar('Locked for 1 month successfully', 'Success');
          this.getAssignRoles();
        } else if (res.message === 'unlocked') {
          this.openSnackBar('UnLocked successfully', 'Success');
          this.getAssignRoles();
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getCurrentTimeFormatted(): string | any {
    const currentTime = Date.now();
    // Use DatePipe to format the current time
    return this.datePipe.transform(currentTime, 'medium');
  }

  shouldShowLockButton(element: any): boolean {
    return (
      element.lockoutEnd == null || new Date(element.lockoutEnd) < new Date()
    );
  }

  shouldShowUnlockButton(element: any): boolean {
    return (
      element.lockoutEnd !== null && new Date(element.lockoutEnd) >= new Date()
    );
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000, // Set the duration for which the snackbar is displayed
    });
  }
}
