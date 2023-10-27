import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../Services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  resMsg: string = '';
  registerForm: FormGroup | any;

  constructor(private fb: FormBuilder, private api: ApiService) {
    this.registerForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      userName: [''],
      email: [''],
      password: [''],
      dob: [new Date()], // Correctly initialize with a date
      gender: [''],
      mobile: [''], // Initialize as an empty string or default value
      city: ['']
    });
  }

  register() {
    if (this.registerForm.valid) {
      const registerData = this.registerForm.value;

      this.api.createAccount(registerData).subscribe(
        (res: any) => {
          console.log(res);
          this.resMsg = res.toString();
        },
        (err: any) => {
          console.log('Error: ');
          console.log(err);
        }
      );
    }
  }
}
