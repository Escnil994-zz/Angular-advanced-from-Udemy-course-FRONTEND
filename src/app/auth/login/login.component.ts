import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';


declare var gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.css'
  ]
})
export class LoginComponent implements OnInit {

  public formSubmitted = false;

  public auth2: any;

  public loginForm = this.fb.group({
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    remember: [false]
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private ngZone: NgZone
  ) {
  }


  ngOnInit(): void {
    this.renderButton();
  }

  login() {
    this.userService.loginUser(this.loginForm.value).subscribe(res => {
      if (this.loginForm.value.remember) {
        localStorage.setItem('email', this.loginForm.get('email').value);
      }
      else {
        localStorage.removeItem('email');
      }
      this.router.navigate(['/dashboard'])
    }, error => {
      Swal.fire({
        title: 'Error!',
        text: error.error.msg,
        icon: 'error',
        confirmButtonText: 'OK'
      });

    });


  }


  //Google Methods

  // console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
  // const token_id = googleUser.getAuthResponse().id_token;

  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark'
    });

    this.startApp();
  }


  async startApp() {

    await this.userService.googleInit();

    this.auth2 = await this.userService.auth2;
    

    this.attachSignin(document.getElementById('my-signin2'));
    
  };

  attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {
        const token_id = googleUser.getAuthResponse().id_token;
        this.userService.loginGoogleUser(token_id).subscribe(res => {

          this.ngZone.run( () => {

            this.router.navigate(['/dashboard'])

          })
        });

      }, function (error) {
        alert(JSON.stringify(error, undefined, 2));
      });
  }

}
