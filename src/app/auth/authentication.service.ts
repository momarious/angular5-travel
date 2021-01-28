import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { tap, catchError, delay } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../user/user';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  apiUrl = 'api/users';
  isLoggedIn = false;
  user: User;
  alertMessage = 'Username or password incorrect';
  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  signup(formData: NgForm) {
    return this.httpClient.post<User>(`${this.apiUrl}/signup`, formData)
      .pipe(
        tap(user => { console.log(user); }),
        catchError(this.handleError('signup', []))
      );
  }

  login(formData: NgForm): Observable<any> {
    return this.httpClient.post<User>(`${this.apiUrl}/login`, formData, httpOptions)
      .pipe(
        delay(1000),
        tap(user => {
          if (user && user.token) {
            this.isLoggedIn = true;
            this.user = user;
            this.setMessage();
          }
        }),
        catchError(this.handleError('login', []))
      );
  }

  logout(): void {
    this.isLoggedIn = false;
    this.setMessage();
    this.router.navigate(['/login']);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'login', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a message on login status */
  setMessage() {
    console.log('Logged ' + (this.isLoggedIn ? 'in' : 'out'));
  }
}
