import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { ModalImagesService } from './../../../services/modal-images.service';
import { HospitalService } from './../../../services/hospital.service';
import { SearchesService } from './../../../services/searches.service';

import { Hospital } from './../../../models/hospital.model';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: [
  ]
})
export class HospitalsComponent implements OnInit {

  public hospitals: Hospital[] = [];

  public loading: boolean = true;

  public imageSubs: Subscription;

  constructor(
    private hospitalsService: HospitalService,
    private modalImageService: ModalImagesService,
    private searchesService: SearchesService
  ) { }

  ngOnInit(): void {
    this.loading = true;

    this.getHospitals();

    this.imageSubs = this.modalImageService.imageChenged.pipe(delay(100)).subscribe((image) => {
      this.getHospitals();
    })

  }

  getHospitals() {
    this.hospitalsService.getHospitals().subscribe(hospitals => {

      this.loading = false;

      this.hospitals = hospitals;

    }, err => {
      console.log(err);

    })
  }

  saveChanges(hospital: Hospital) {

    Swal.fire({
      title: '¿Seguro que quieres guardar los cambios?',
      showCancelButton: true,
      confirmButtonText: `Si`,
      cancelButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {

        this.hospitalsService.updateHospital(hospital.uid, hospital.name).subscribe(
          res => {

            Swal.fire('Guardado', '', 'success')

          }, error => {
            Swal.fire('Error', `${error.error.msg}`, 'error')

          }

        )
      } else if (result.isDismissed) {
        Swal.fire('Los cambios no fueron guardados', '', 'info')
      }
    })



  }

  deleteHospital({ uid, name }: Hospital) {
    Swal.fire({
      title: `¿Seguro que quieres eliminar el hospital ${name}?`,
      showCancelButton: true,
      confirmButtonText: `Si`,
      confirmButtonColor: '#d14529',
      cancelButtonText: `No`,
      cancelButtonColor: '#2778c4'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {

        this.hospitalsService.deleteHospital(uid).subscribe(
          res => {

            Swal.fire('Eiminado', `El hospital ${name} fue eliminado`, 'success');

            this.getHospitals();

          }, error => {
            Swal.fire('Error', `${error.error.msg}`, 'error')

          }

        )
      } else if (result.isDismissed) {
        Swal.fire('Tranquilo', `El hospital ${name} no fue eliminado`, 'info')
      }
    })



  }

  async createNewHospital() {
    const { value } = await Swal.fire({
      title: 'Crear hospital',
      input: 'text',
      text: 'Nombre del hospital',
      inputPlaceholder: 'Ingrese el nombre del hospital',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'Debes escribir un nombre para este hospital'
        }
        else {
          this.hospitalsService.createHospital(value).subscribe(res => {
            Swal.fire('Hospital creado correctamente', '', 'success');
            this.getHospitals();

          }, error => {
            Swal.fire(error.error.msg, '', 'success')
          });
        }
      }
    });

  }

  openModal({ uid, image }: Hospital) {
    this.modalImageService.openModal('hospitals', uid, image);

  }

  search(searchWord: string) {
    if (searchWord.length === 0) {
      return this.getHospitals();
    }
    this.searchesService.search('hospitals', searchWord).subscribe(results => {
      this.hospitals = results;
    },
      error => console.log(error)
    );
  }
}
