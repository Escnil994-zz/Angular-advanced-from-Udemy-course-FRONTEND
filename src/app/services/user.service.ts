import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { LoginFormInterface } from "../interfaces/login-form.interface";
import { RegisterFormInterface } from '../interfaces/register-form.interface';


import { environment } from '../../environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';


const base_url = environment.base_url;

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public auth2: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.googleInit();
  }

  createUser(formData: RegisterFormInterface) {

    return this.http.post(`${base_url}/users`, formData)
      .pipe(
        tap((res: any) => {
          localStorage.setItem('token', res.token);
        })
      )
  }

  loginUser(formData: LoginFormInterface) {
    return this.http.post(`${base_url}/login`, formData)
      .pipe(
        tap((res: any) => {
          localStorage.setItem('token', res.token);
        })
      )
  }

  loginGoogleUser(token) {
    return this.http.post(`${base_url}/login/google`, { token })
      .pipe(
        tap((res: any) => {
          localStorage.setItem('token', res.token);
        })
      )
  }

  validateToken(): Observable<boolean> {

    const token = localStorage.getItem('token') || '';


    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(tap((res: any) => {
      localStorage.setItem('token', res.token);
    }), map(res => true),
    catchError( error => of (false)));
  }

  googleInit (){

    return new Promise( resolve => {

      gapi.load('auth2', () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id: '963808556047-8r2doqjb26rh6j4rfe2su55ka8d2cip4.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });

        resolve();

      });

    })

  }

  logout(){
    localStorage.removeItem('token');

    
    this.auth2.signOut().then(() => {

      this.ngZone.run( () => {
        
        this.router.navigateByUrl('/login');

      });

    });
  }

}
