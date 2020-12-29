import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { LoginFormInterface } from "../interfaces/login-form.interface";
import { RegisterFormInterface } from '../interfaces/register-form.interface';
import { loadUsersInterface } from './../interfaces/load-users.interface';


import { environment } from '../../environments/environment';
import { catchError, delay, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';


import { User } from "../models/user.model";


const base_url = environment.base_url;

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public auth2: any;

  public user: User

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.googleInit();
  }
  
  saveInLocalStorage( token: string, menu: any ){

    localStorage.setItem('token', token)

    localStorage.setItem('menu', JSON.stringify(menu) )

  }

  get role(): 'ADMIN_ROLE' | 'USER_ROLE'{
    return this.user.role;
  }

  createUser(formData: RegisterFormInterface) {

    return this.http.post(`${base_url}/users`, formData)
      .pipe(
        tap((res: any) => {

          this.saveInLocalStorage( res.token, res.menu );

        })
      )
  }

  get token(): string {
    return localStorage.getItem('token' || '');
  }

  get uid(): string {
    return this.user.uid || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  loginUser(formData: LoginFormInterface) {
    return this.http.post(`${base_url}/login`, formData)
      .pipe(
        tap((res: any) => {

          this.saveInLocalStorage( res.token, res.menu );

        })
      )
  }

  loginGoogleUser(token) {
    return this.http.post(`${base_url}/login/google`, { token })
      .pipe(
        tap((res: any) => {
          
          this.saveInLocalStorage( res.token, res.menu );

        })
      )
  }

  validateToken(): Observable<boolean> {



    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(map((res: any) => {
      const { email, google, name, role, image, uid } = res.user;

      this.user = new User(name, email, '', image, google, role, uid);

      this.saveInLocalStorage( res.token, res.menu );

      return true;
    }),
      catchError(error => of(false)));
  }

  googleInit() {

    return new Promise(resolve => {

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

  logout() {
    localStorage.removeItem('token');


    this.auth2.signOut().then(() => {

      this.ngZone.run(() => {

        this.router.navigateByUrl('/login');

      });

    });
  }

  updateUser(formData: { name: string, email: string, role: string }) {

    formData = {
      ...formData,
      role: this.user.role
    }

    return this.http.put(`${base_url}/users/${this.uid}`, formData, this.headers);

  }

  getUsers(to: number) {

    const url = `${base_url}/users/since?from=${to}`;
    return this.http.get<loadUsersInterface>(url, this.headers).
      pipe(
        map(res => {
          const users = res.users.map(
            users => new User(users.name, users.email, '', users.image, users.google, users.role, users.uid)
          );
          return {
            total: res.total,
            users
          };
        })
      )
  }

  deletUser(user: User) {
    return this.http.delete(`${base_url}/users/${user.uid}`, this.headers)
  }

  changeRole(user: User) {    

    return this.http.put(`${base_url}/users/${user.uid}`, user, this.headers);

  }
}
