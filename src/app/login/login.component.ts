import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../Services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  loginForm:FormGroup;
  resMsg:string='';

  constructor(private fb:FormBuilder,private api:ApiService,private router:Router){
      this.loginForm=fb.group({
        email: fb.control('',Validators.required),
        password: fb.control('',Validators.required)
      });  
   
      
    }

    login(){
      let loginInfo={
        email:this.loginForm.get('email')?.value,
        password:this.loginForm.get('password')?.value,
      };

      this.api.login(loginInfo).subscribe({
        next: (res:any)=>{
          if(res.toString()==='Invalid'){
            this.resMsg='Invalid Credentials'
          } 
          else{
            this.resMsg='';
            this.api.saveToken(res.token.toString());
            this.router.navigateByUrl("/home");
          }
        },
        error(err:any){
          console.log('Error');
          console.log(err);
        }
      })
    }


}
