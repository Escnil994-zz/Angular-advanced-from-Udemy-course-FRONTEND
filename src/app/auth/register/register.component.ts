import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [
    './register.component.css'
  ]
})
export class RegisterComponent {

  public formSubmitted = false;

  public registerForm = this.fb.group({
    name: ['Nilson', Validators.required],
    email: ['@gmail.com', [Validators.required, Validators.email]],
    password: ['12345', Validators.required],
    password2: ['12345', Validators.required],
    terms: [false, Validators.required]
  }, {
    validators: this.samePasswords('password', 'password2')
  });

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
  }

  createUser() {
    this.formSubmitted = true;
    console.log(this.registerForm.value);


    if ((this.registerForm.valid) && (this.registerForm.value.terms === true )) {
      
      this.userService.createUser(this.registerForm.value).subscribe(res => {
        console.log(res);
        Swal.fire({
          title: 'Success!',
          text: `Welcome ${this.registerForm.value.name} you're registered correctly`,
          icon: 'success',
          confirmButtonText: 'OK'
        });

        this.router.navigate(['/dashboard'])

      }, error => {
        Swal.fire({
          title: 'Error!',
          text: error.error.msg,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      });
    } else {
      console.log('Could not post');
    }
  }

  validField(field: string): boolean {
    if (this.registerForm.get(field).invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  passwordMatch() {
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;

    if ((pass1 !== pass2) && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  acceptTerms() {
    return !this.registerForm.get('terms').value && this.formSubmitted;
  }

  samePasswords(pass1Name: string, pass2Name: string) {

    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if (pass1Control.value === pass2Control.value) {
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({doesNotMatch: true});
      }
    };
  }
}
