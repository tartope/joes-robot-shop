import { Component } from '@angular/core';
import { IUserCredentials } from '../user.model';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'bot-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent {
  credentials: IUserCredentials = { email: '', password: '' }
  // Initiate signInError property and set to false
  signInError: boolean = false;

  // Inject and import userService and router into constructor
  constructor(private userService: UserService, private router: Router) { }

  signIn(){
    // Everytime they signin, resets the flag to false, so it clears the true if the first signin fails
    this.signInError = false;
    // Call user service here
    this.userService.signIn(this.credentials).subscribe({
      // After sign in suceeds, redirect to catalog page
      next: ()=> this.router.navigate(['/catalog']),
      // If signin fails, error is set to true, and error is shown
      error: ()=> (this.signInError = true)
    });
    
  }

}
