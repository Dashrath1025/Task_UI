import { Component } from '@angular/core';
import { SideNvItem } from '../Model/model';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent {
  sideNavContent:SideNvItem[]=[
    {
      title: 'Home',
      link:'home'
    },
    {
      title: 'Manage Tasks',
      link:'task'
    },
    {
      title: 'Manage Role',
      link:'manage-role'
    },
    {
      title: 'Assign Role',
      link:'assign-role'
    },
   ];
}
