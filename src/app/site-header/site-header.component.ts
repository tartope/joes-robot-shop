import { Component, OnInit } from '@angular/core';
import { IUser } from '../user/user.model';
import { UserService } from '../user/user.service';

@Component({
  selector: 'bot-site-header',
  templateUrl: './site-header.component.html',
  styleUrls: ['./site-header.component.css']
})
export class SiteHeaderComponent implements OnInit{
  // Need a user object to detect if user is signed in or not
  // The property will be either IUser OR null, but starts as null
  user: IUser | null = null;
  // Toggles sign out menu
  showSignOutMenu: boolean = false;

  // Inject UserService
  constructor(private userService: UserService) { }

  // Subscribe to user state
  ngOnInit()  {
    // Call method in userService and subscribe because it returns an observable
    this.userService.getUser().subscribe({
      // When the user value is updated, set user property to user
      next: (user) => { this.user = user }
    })
  }

  // A method to toggle this value
  toggleSignOutMenu(){
    this.showSignOutMenu = !this.showSignOutMenu;
  }

  // A method to signOut the user
  signOut(){
    // Calls this method from UserService to sign user out
    this.userService.signOut();
    // Resets to show menu after sign out
    this.showSignOutMenu = false;
  }

}
