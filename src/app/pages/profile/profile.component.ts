import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import { User } from 'src/app/models/user.model';


import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { FileUploadService } from "../../services/file-upload.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {

  public profileForm: FormGroup;

  public user: User;

  public imageToUpload: File;

  public imageTemp: any = "";

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private fileUploadService: FileUploadService
  ) {
    this.user = userService.user;
   }

  ngOnInit(): void {

    this.profileForm = this.fb.group({
      name: [this.user.name, Validators.required],
      email: [this.user.email, [ Validators.required, Validators.email ]]
    });
  }

  updateProfile(){
    this.userService.updateUser(this.profileForm.value).subscribe(
      () => {
        const { name, email } = this.profileForm.value;

        this.user.name = name;
        this.user.email = email;

        Swal.fire('Actualizado correctemente', 'El usuario ha sido actualizado correctamente', 'success')
      }
    , error => {
      Swal.fire('Error', error.error.msg, 'error');   
    });
    
  }

  changeImage( file: File ){
    this.imageToUpload = file;

    if (!file) {
      return this.imageTemp = null;}

    const reader = new FileReader();

    reader.readAsDataURL( file );

    reader.onloadend = ()  => {
      this.imageTemp = reader.result
      
    }
    

  
    
  }
  uploadImage(){

    this.fileUploadService.updateImage( this.imageToUpload, 'users', this.user.uid )
    .then( image =>{
       this.user.image = image

       Swal.fire('Imagen Actualizada', 'La imagen se ha actuaizado correctamente', 'success');   


    }).catch( error => {
      Swal.fire('Error', error.error.msg, 'error');   
    });
  }
}
