import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../Services/api.service';
import { User } from '../Model/model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  userId: string | any;
  displayImage = '';
  image: any='';
  user:any;
  constructor(private api: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    //debugger;
    // this.route.paramMap.subscribe((params) => {
    //   this.userId = params.get('id');
    //   console.log(this.userId);
    this.userId = this.api.getTokenUserInfo()?.id;
    console.log(this.userId);
    if (this.userId) {
      this.setImage();
    } else {
      this.api.getUser(this.userId).subscribe(
        (success) => {
         this.user = success;
         this.setImage();
        },
        (error) => {
         this.setImage();
        }
      );
    }
    
  } 

  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }

  public setImage(): void {
    
    if (this.image) {
      console.log(this.image);
      this.displayImage = this.api.getImagePath(this.image);
    } 
    else {
      this.displayImage = '/assets/strix.jpg';
    }
  }

  uploadImage(event: any): void {
    debugger;
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
          alert("somthing went wrong")
        }
      );
    }
  }
}
