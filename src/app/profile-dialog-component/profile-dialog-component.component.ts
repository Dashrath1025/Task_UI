import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../Services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-dialog-component',
  templateUrl: './profile-dialog-component.component.html',
  styleUrls: ['./profile-dialog-component.component.css'],
})
export class ProfileDialogComponentComponent implements OnInit {

  userId: string | any;
  displayImage = '';
  image: any = '';
  user: any;
  updateForm: FormGroup | any;
  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ProfileDialogComponentComponent>
  ) {
    this.updateForm = this.fb.group({
      userId: [''],
      name: [''],
      email: [''],
      city: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
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

  public setImage(): void {
    if (this.user.image) {
      console.log(this.image);
      this.displayImage = this.api.getImagePath(this.user.image);
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
          this.image = success;
          alert('image upload successfully!');
          this.setImage();
          location.reload();
        },

        (error) => {
          alert('somthing went wrong');
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
          console.log('Profile updated successfully', response);
          alert('Update Profile Succefully');
          // Add any additional logic or notifications here
        },
        (error) => {
          console.error('Error updating profile', error);
          // Handle error cases here
        }
      );
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
