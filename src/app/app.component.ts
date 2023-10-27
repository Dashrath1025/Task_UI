import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'task_ui';
  constructor(private router:Router){}

  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }

  logout(){
    localStorage.removeItem('access_token');
    this.router.navigate(['/login'])
  }
}
