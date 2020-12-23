import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Hospital } from '../models/hospital.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  public hospital: Hospital

  constructor(
    private http: HttpClient
  ) { }


  get token(): string {
    return localStorage.getItem('token' || '');
  }


  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  getHospitals() {

    const url = `${base_url}/hospitals`;
    return this.http.get(url, this.headers).pipe(
      map((res: { ok: boolean, hospital: Hospital[] }) => {
        return res.hospital
      })
    );
  }

  createHospital(name: string) {
    const url = `${base_url}/hospitals`;

    return this.http.post(url, { name }, this.headers);

  }



  updateHospital(_id: string, name: string) {
    const url = `${base_url}/hospitals/${_id}`;

    return this.http.put(url, { name }, this.headers);

  }

  deleteHospital(_id: string) {
    const url = `${base_url}/hospitals/${_id}`;

    return this.http.delete(url, this.headers);

  }

}
