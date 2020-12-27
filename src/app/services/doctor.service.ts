import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Doctor } from "../models/doctors.model";

import { environment } from "../../environments/environment";
import { map, delay } from 'rxjs/operators';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  public doctor: Doctor;

  constructor(
    private http: HttpClient
  ) { }


  get token(): string {
    return localStorage.getItem('token' || '');
  }

  get uid(): string {
    return this.doctor.uid || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  getDoctors() {

    const url = `${base_url}/doctors`

    return this.http.get(url, this.headers).pipe(
      map((res: { ok: boolean, doctor: Doctor[] }) => {
        return res.doctor;

      })
    )

  }


  getDoctor(id: string) {
    const url = `${base_url}/doctors/${id}`
    return this.http.get(url, this.headers).pipe(
      map((res: { ok: boolean, doctor: Doctor }) => res.doctor )
    )
  
  }

  createDoctor(doctor: { name: string, hospital: string }) {
    const url = `${base_url}/doctors`;

    return this.http.post(url, doctor, this.headers);

  }




  updateDoctor(doctor: Doctor) {
    
    const url = `${base_url}/doctors/${doctor.uid}`;
    
    

    return this.http.put(url, doctor, this.headers);

  }

  deleteDoctor(uid: string) {
    
    const url = `${base_url}/doctors/${uid}`;

    return this.http.delete(url, this.headers);

  }

}
