import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Doctor } from 'src/app/models/doctors.model';
import { ModalImagesService } from 'src/app/services/modal-images.service';
import { SearchesService } from 'src/app/services/searches.service';
import Swal from 'sweetalert2';

import { DoctorService } from "../../../services/doctor.service";

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styles: [
  ]
})
export class DoctorsComponent implements OnInit, OnDestroy {


  public doctors: Doctor[] = [];

  public imageSubs: Subscription;

  public loading: boolean = true;



  constructor(
    private doctorService: DoctorService,
    private modalImageService: ModalImagesService,
    private searchService: SearchesService
  ) { }
  ngOnDestroy(): void {

    this.imageSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.getDoctors();

    this.imageSubs = this.modalImageService.imageChenged.pipe(delay(100)).subscribe((image) => {
      this.getDoctors();
    })
  }

  getDoctors() {
    this.loading = true;

    this.doctorService.getDoctors().subscribe(doctor => {

      this.doctors = doctor;

      this.loading = false;


    }, error => {
      console.log(error);

    });

  }

  deleteDoctor(doctor: Doctor) {    


    Swal.fire({
      title: `¿Seguro que quieres eliminar el médico ${name}?`,
      showCancelButton: true,
      confirmButtonText: `Si`,
      confirmButtonColor: '#d14529',
      cancelButtonText: `No`,
      cancelButtonColor: '#2778c4'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        
        this.doctorService.deleteDoctor(doctor.uid).subscribe(
          res => {
            
            Swal.fire('Eiminado', `El médico ${doctor.name} fue eliminado`, 'success');
            this.getDoctors();

          }, error => {
            Swal.fire('Error', `${error.error.msg}`, 'error')

          }

        )
      } else if (result.isDismissed) {
        Swal.fire('Tranquilo', `El médico ${doctor.name} no fue eliminado`, 'info')
      }
    })



  }


  openModal({ uid, image }: Doctor) {
    this.modalImageService.openModal('doctors', uid, image);

  }

  search(term: string) {
    if (term.length === 0) {
      return this.getDoctors();
    }
    this.searchService.search('doctors', term).subscribe(results => {
      this.doctors = results;
    },
      error => console.log(error)
    );
  }
}
