import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { Doctor } from 'src/app/models/doctors.model';
import { Hospital } from 'src/app/models/hospital.model';
import { DoctorService } from 'src/app/services/doctor.service';
import { HospitalService } from 'src/app/services/hospital.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styles: [
  ]
})
export class DoctorComponent implements OnInit {

  public hospitals: Hospital[];

  public doctorForm: FormGroup;

  public hospitalSelected: Hospital;

  public doctorSelected: Doctor;

  public titleName: string = '';


  constructor(
    private fb: FormBuilder,
    private hospitalService: HospitalService,
    private doctorService: DoctorService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {



    this.activatedRoute.params.subscribe(({ id }) => this.loadDoctor(id));


    this.doctorForm = this.fb.group({
      name: ['', Validators.required],
      hospital: ['', Validators.required]
    });
    this.loadHospitals();


    this.doctorForm.get('hospital').valueChanges.subscribe(hospitalId => {
      this.hospitalSelected = this.hospitals.find(hosp => hosp.uid === hospitalId);

    });


  }

  loadHospitals() {

    this.hospitalService.getHospitals().subscribe(hospital => {
      this.hospitals = hospital;
    });



  }

  loadDoctor(id: string) {

    if (id === 'new') {
      return;
    }


    this.doctorService.getDoctor(id).pipe(delay(50)).subscribe((doctor: any) => {

      if (!doctor) {
        return this.router.navigateByUrl('/dashboard/doctors');

      }

      const { name, hospital: { _id } } = doctor;


      this.doctorForm.setValue({ name, hospital: _id })

      this.doctorSelected = doctor;

    })
  }

  saveDoctor() {

    if (this.doctorSelected) {

      //Update
      const data = {
        ...this.doctorForm.value,
        uid: this.doctorSelected.uid
      }
      this.doctorService.updateDoctor(data).subscribe(res => {

        Swal.fire('Exito!!!', `El médico ${this.doctorForm.value.name} se actualizó correctamente`, 'success');


      })

    } else {

      //Create

      this.doctorService.createDoctor(this.doctorForm.value).subscribe((res: any) => {

        Swal.fire('Exito!!!', `El médico ${this.doctorForm.value.name} se creó correctamente`, 'success');
        this.router.navigateByUrl(`/dashboard/doctors/${res.doctor.uid}`)
      }, error => {

      })

    }



  }

}
