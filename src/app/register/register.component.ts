import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../Services/api.service';
import { Route, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  resMsg: string = '';
  registerForm: FormGroup | any;
  genderList: string[]=['Male','Female','Other']

  constructor(private fb: FormBuilder, private api: ApiService,private router:Router,private snackBar: MatSnackBar) {
    this.registerForm = this.fb.group({
      firstName: ['',[Validators.required,Validators.minLength(3)]],
      lastName: ['',[Validators.required,Validators.minLength(3)]],
      // userName: ['',[Validators.required,Validators.minLength(3)]],
      email: ['',[Validators.required,Validators.email]],
      password: ['',[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
      dob: [new Date()], // Correctly initialize with a date
      gender: ['',Validators.required],
      mobile: ['',[Validators.required,Validators.pattern(/^\d{10}$/)]], // Initialize as an empty string or default value
      city: ['',Validators.required]
    });
  }

  myFilter = (d: Date | any): boolean => {
    const currentDate = new Date();
    
    // Check if 'd' is a Date object
    if (!(d instanceof Date)) {
      // If not, create a new Date object using the provided value
      d = new Date(d);
    }
  
    // Check if 'd' is a valid Date object
    if (isNaN(d.getTime())) {
      return false; // If not, consider it an invalid date
    }
  
    currentDate.setHours(0, 0, 0, 0);
    d.setHours(0, 0, 0, 0);
  
    return d <= currentDate;
  };
  

  register() {
    if (this.registerForm.valid) {
      const registerData = this.registerForm.value;

      this.api.createAccount(registerData).subscribe(
        (res: any) => {
          console.log(res);
          this.resMsg = res.toString();
        
          // Display snack bar
          this.snackBar.open('Registration successful!', 'Close', {
            duration: 3000, // Duration in milliseconds
          });
        
          // Navigate to login page after snack bar is closed
          
            this.router.navigate(['/login']);
          
        },
        (err: any) => {
          this.snackBar.open('Somthing went wrong', 'Close', {
            duration: 3000, // Duration in milliseconds
          });
        
        }
        
      );
    }
  }
}
