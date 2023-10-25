import {Component} from '@angular/core';
import {User} from "../../../core/models/user/user";
import {AuthService} from "../../../core/services/auth.service";
import {UserRoles} from "../../../core/enums/user-roles.enum";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register', templateUrl: './register.component.html', styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  // User model to store registration information
  user: User = new User();

  constructor(private authService: AuthService, private toastService: ToastrService, private router: Router) {
  }

  /**
   * Registers a new user using the AuthService.
   * Clears any previous error message before making the registration attempt.
   * Set a default role (temporal)
   */
  register() {
    this.user.role = UserRoles.CUSTOMER;
    this.authService.register(this.user).subscribe({
      next: response => {
        this.toastService.success("Welcome!", "Registration successful")
        this.router.navigate(['home']);
      }, error: err => {
        if (err.status === 0) {
          this.toastService.error("Unable to connect to the server. Please check your internet connection or try again later.", "Server Unavailable");
        } else if (err.error.fieldErrors != null) {
          this.toastService.error(err.error.fieldErrors, "Registration error")
        } else {
          this.toastService.error(err.error.message, "Registration error")
        }
      }
    });
  }

}
