import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../Services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile-dialog-component',
  templateUrl: './profile-dialog-component.component.html',
  styleUrls: ['./profile-dialog-component.component.css'],
})
export class ProfileDialogComponentComponent implements OnInit {

  @Output() imageUpdated: EventEmitter<void> = new EventEmitter<void>();
  
  userId: string | any;
  displayImage = '';
   // image: any = '';
  user: any;
  updateForm: FormGroup | any;
  constructor(
    private api: ApiService,
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ProfileDialogComponentComponent>,
    private cdRef: ChangeDetectorRef 
  ) {
    this.updateForm = this.fb.group({
      userId: [''],
      name: [''],
      email: [''],
      city: ['', [Validators.required]],
      mobile: ['', [Validators.required,Validators.pattern('^[0-9]{10}$')]],
    });
  }

  ngOnInit(): void {
    //debugger;
    // this.route.paramMap.subscribe((params) => {
    //   this.userId = params.get('id');
    //   console.log(this.userId);
    this.userId = this.api.getTokenUserInfo()?.id;
    console.log(this.userId);
    this.api.getUser(this.userId).subscribe(
      (success) => {
        this.user = success;
        console.log(this.user);
        this.updateForm.patchValue({
          name: this.user.firstName,
          email: this.user.email,
          mobile: this.user.mobile,
          city: this.user.city,
        });
        this.setImage();
      },
      (error) => {
        this.setImage();
      }
    );

  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }

  private setImage(): void {
    if (this.user.image) {
    //  console.log(this.image);
      this.displayImage = this.api.getImagePath(this.user.image);
      console.log('User Image:', this.user.image);
      
    } else {
      this.displayImage = '/assets/strix.jpg';
    }
  }

  uploadImage(event: any): void {
   
    if (this.userId) {
      const file: File = event.target.files[0];
      this.api.uploadImage(this.userId, file).subscribe(
        (success) => {
          console.log(success);
          this.user.image = success;
          this.setImage();
          this.snackBar.open('Profile Update successfull!', 'Close', {
            duration: 3000, // Duration in milliseconds
          });
          // debugger;
         
        //  console.log(this.setImage());
          
        // this.imageUpdated.emit();
          //this.cdRef.detectChanges();
        //  location.reload();

        },

        (error) => {
          this.snackBar.open('Something went wrong!', 'Error', {
            duration: 3000, // Duration in milliseconds
          });
        }
      );
    }
  }

  updateProfile() {
    if (this.updateForm.valid) {
      const formData = this.updateForm.value;
      console.log(this.userId);
      formData.userId = this.userId;
      console.log(formData);
      this.api.updateProfile(formData).subscribe(
        (response) => {
          this.snackBar.open('Profile Update successfull!', 'Close', {
            duration: 3000, // Duration in milliseconds
          });
          this.dialogRef.close();
          // this.router.navigate(['/home'])
          
          // Add any additional logic or notifications here
        },
        (error) => {
          this.snackBar.open('Somethign went wrong!', 'Error', {
            duration: 3000, // Duration in milliseconds
          });
        }
      );
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
