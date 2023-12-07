import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../Services/api.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  loginForm:FormGroup;
  resMsg:string='';
  hide=true;

  constructor(private fb:FormBuilder,private api:ApiService,private router:Router,private snackBar:MatSnackBar ){
      this.loginForm=fb.group({
        email: fb.control('',[Validators.required,Validators.email]),
        password: fb.control('',[Validators.required,Validators.minLength(6),Validators.maxLength(16)])
      });  
   
      
    }


    login() {
    let loginInfo = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
    };

    this.api.login(loginInfo).subscribe({
      next: (res: any) => {
        if (res.status === 401 && res.error === 'Invalid') {
          this.resMsg = 'Invalid Credentials';
          this.openSnackBar(this.resMsg, 'Error');
        } else {
          this.resMsg = '';
          if (res && res.token) {
            this.api.saveToken(res.token.toString());
          }
          this.router.navigateByUrl("/home");
        }
      },
      error: (err: any) => {
        console.log('Error');
        if (err.status === 423 && err.error === 'Locked') {
          this.resMsg = 'Your account is locked. Please contact the administrator for assistance.';
          this.openSnackBar(this.resMsg, 'Error');
        } else {
          if (err.status === 401 && err.error === 'Invalid') {
            this.resMsg = 'Invalid credentials. Email or password is incorrect';
            this.openSnackBar(this.resMsg, 'Error');
          } else {
            this.openSnackBar('An error occurred. Please try again later.', 'Error');
          }
        }
      }
    });
  }
  
  
    // Function to display a snackbar
    openSnackBar(message: string, action: string) {
      this.snackBar.open(message, action, {
        duration: 3000, // Set the duration for which the snackbar is displayed
      });
    }

    get Email(): FormControl {
      return this.loginForm.get('email') as FormControl;
    }
  
    get Password(): FormControl {
      return this.loginForm.get('password') as FormControl;
    }
  
    getEmailErrors() {
      if (this.Email.hasError('required')) return 'Email is required';
      if (this.Email.hasError('email')) return 'Email is not valid';
      return '';
    }
  
    getPasswordErrors() {
      if (this.Password.hasError('required')) return 'Password is required';
      if (this.Password.hasError('minlength')) return 'min length is 8';
      if (this.Password.hasError('maxlength')) return 'max length is 16';
      return '';
    }

}
