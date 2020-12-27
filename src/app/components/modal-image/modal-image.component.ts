import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import Swal from 'sweetalert2';


import { ModalImagesService } from './../../services/modal-images.service';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styles: [
  ]
})




export class ModalImageComponent implements OnInit {

  public imageToUpload: File;

  public imageTemp: any = "";

  constructor(
    public modalImageService: ModalImagesService,
    public fileUploadService: FileUploadService
  ) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.modalImageService.closeModal();
    this.imageTemp = null;
  }


  changeImage(file: File) {




    this.imageToUpload = file;

    if (!file) {
      return this.imageTemp = null;
    }

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imageTemp = reader.result

    }
  }


  uploadImage() {

    

    const id = this.modalImageService.id;

    const type = this.modalImageService.type;

    this.fileUploadService.updateImage(this.imageToUpload, type, id)
      .then(image => {
        Swal.fire('Imagen Actualizada', 'La imagen se ha actuaizado correctamente', 'success');

        this.modalImageService.imageChenged.emit(image);

        this.closeModal();

      }).catch(error => {
        Swal.fire('Error', error.error.msg, 'error');
      });
  }


 
}
