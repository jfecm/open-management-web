import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment.dev';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../models/user/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Base URL for authentication requests
  URL_BASE = environment.API_OPEN_MANAGEMENT_URL + 'auth/';

  constructor(private _http: HttpClient) {

  }

  /**
   * Sends a login request to the authentication server.
   * @param username The user's username.
   * @param password The user's password.
   * @returns An observable that emits the server's response.
   */
  public login(username: string, password: string): Observable<any> {
    // Request body in JSON format
    const body = JSON.stringify({ username, password });
    // Sends a POST request to the authentication server
    return this._http.post(this.URL_BASE + 'sign-in', body, this.httpOptions);
  }

  /**
   * Registers a new user on the authentication server.
   *
   * @param user The user object containing registration information.
   * @returns An observable that emits the server's response.
   */
  public register(user: User) {
    // Request body in JSON format
    const body = JSON.stringify(user);
    // Sends a POST request to the registration endpoint
    return this._http.post(this.URL_BASE + 'register', body, this.httpOptions);
  }

  private httpOptions = {
    // HTTP header options for the request
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
}
