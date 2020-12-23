import { Hospital } from './../models/hospital.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { environment } from './../../environments/environment.prod';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class SearchesService {


  constructor(private http: HttpClient) {
  }


  get token() {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    };
  }

  private transformUsers(results: any[]): User[] {
    return results.map(
      users => new User(users.name, users.email, '', users.img, users.google, users.role, users.uid)
    );
  }

  private transformHospitals(results: any[]): Hospital[]{
    return results;

  }


  search(
    type: 'users' | 'doctors' | 'hospitals',
    searchTerm: string
  ) {
    const url = `${base_url}/all/${type}/${searchTerm}`;

    return this.http.get<any[]>(url, this.headers).pipe(map(
      (res: any) => {
        switch (type) {
          case 'users':
            return this.transformUsers(res.results);

            case 'hospitals':
              return this.transformHospitals(res.results);

          default:
            return [];

        }
      }));

  }
}
