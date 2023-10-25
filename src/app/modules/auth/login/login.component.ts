import {Component} from '@angular/core';
import {User} from "../../../core/models/user/user";
import {AuthService} from "../../../core/services/auth.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login', templateUrl: './login.component.html', styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // User model to store username and password
  user: User = new User();

  constructor(private authService: AuthService, private toastService: ToastrService, private router: Router) {
  }

  /**
   * Attempts to log in the user using the AuthService.
   * Clears any previous error message before making the login attempt.
   */
  login() {
    this.authService.login(this.user.username, this.user.password).subscribe({
      next: response => {
        this.toastService.success("Login successful!")
        this.router.navigate(['home']);
      }, error: err => {
        if (err.status === 0) {
          this.toastService.error("Unable to connect to the server. Please check your internet connection or try again later.", "Server Unavailable");
        } else if (err.error.fieldErrors != null) {
          this.toastService.error(err.error.fieldErrors, "Registration error");
        } else if (err.error.detail != null) {
          this.toastService.error(err.error.detail, "Registration error");
        } else {
          this.toastService.error(err.error.message, "Registration error");
        }
      }
    });
  }

}
