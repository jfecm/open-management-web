import {Component} from '@angular/core';
import {User} from "../../../core/models/user/user";
import {AuthService} from "../../../core/services/auth.service";

@Component({
  selector: 'app-login', templateUrl: './login.component.html', styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // User model to store username and password
  user: User = new User();
  // Error message to display in case of login failure
  error: string | null = null;

  constructor(private authService: AuthService) {

  }

  /**
   * Attempts to log in the user using the AuthService.
   * Clears any previous error message before making the login attempt.
   */
  login() {
    this.clearError();
    this.authService.login(this.user.username, this.user.password).subscribe({
      next: response => {
        console.log('Login successful:', response);
      }, error: err => {
        this.handleLoginError(err);
      }
    });
  }

  /**
   * Clears the error message, setting it to null.
   */
  clearError() {
    this.error = null;
  }

  /**
   * Handles and displays the login error message.
   * @param error The error object received from the AuthService.
   */
  private handleLoginError(error: any): void {
    this.error = error.error.message;
  }

}
