import {Component} from '@angular/core';
import {User} from "../../../core/models/user/user";
import {AuthService} from "../../../core/services/auth.service";
import {UserRoles} from "../../../core/enums/user-roles.enum";

@Component({
  selector: 'app-register', templateUrl: './register.component.html', styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  // User model to store registration information
  user: User = new User();
  // Error message to display in case of registration failure
  error: string | null = null;

  constructor(private authService: AuthService) {
  }

  /**
   * Registers a new user using the AuthService.
   * Clears any previous error message before making the registration attempt.
   * Set a default role (temporal)
   */
  register() {
    this.clearError();
    this.user.role = UserRoles.CUSTOMER;
    this.authService.register(this.user).subscribe({
      next: response => {
        console.log('Registration successful:', response);
      }, error: err => {
        console.log(err);
        this.handleRegistrationError(err);
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
   * Handles and displays the registration error message.
   * @param error The error object received from the AuthService.
   */
  private handleRegistrationError(error: any): void {
    this.error = this.extractErrorMessage(error) ?? 'Registration error. Please try again later.';
  }

  private extractErrorMessage(error: any): string | null {
    const errorMessage = error?.error?.message;

    if (errorMessage) {
      const interpolatedMessage = errorMessage.match(/interpolatedMessage='([^']+)'/)?.[1];

      if (interpolatedMessage) {
        return interpolatedMessage;
      }

      return errorMessage;
    }

    return null;
  }
}
