import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { delay } from 'rxjs/operators';

import { ModalImagesService } from './../../../services/modal-images.service';
import { SearchesService } from './../../../services/searches.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: []
})
export class UsersComponent implements OnInit, OnDestroy {

  public totalUsers: number = 0;

  public users: User[] = [];

  public usersTerm: User[] = [];

  public to: number = 0;

  public loading: boolean = true;

  public imageSubs: Subscription;


  constructor(
    private userService: UserService,
    private searchesService: SearchesService,
    private modalImageService: ModalImagesService
  ) {
  }
  
  ngOnInit(): void {
    
    this.loadUsers();
    
    this.imageSubs = this.modalImageService.imageChenged.pipe(delay(100))
    .subscribe( () => this.loadUsers());
    
    
  }

  ngOnDestroy(): void {
    this.imageSubs.unsubscribe();
  }
  
  loadUsers() {
    this.loading = true;
    this.userService.getUsers(this.to).subscribe(({ total, users }) => {
      this.totalUsers = total;
      this.users = users;
      this.usersTerm = users;

      this.loading = false;
    });
  }

  changePage(valor: number) {
    this.to += valor;
    if (this.to < 0) {
      this.to = 0;
    } else if (this.to >= this.totalUsers) {
      this.to -= valor;
    }

    this.loadUsers();

  }

  search(searchTerm: string) {

    if (searchTerm.length === 0) {
      return this.users = this.usersTerm;
    }
    this.searchesService.search('users', searchTerm).subscribe(
      (results: any) => {
        
        this.users = results;
      },
      err => console.error(err)
    );
  }

  deleteUser(user: User) {
    if (user.uid === this.userService.uid) {
      return Swal.fire('Error', 'No puedes borrarte tu mismo, inicia sesion con otra cuenta', 'error');
    }

    Swal.fire({
      title: '¿Estás seguro',
      text: "Una vez borrado, no podras recuperarlo",
      icon: 'question',
      confirmButtonText: 'Yes, delete it!',
      showCancelButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deletUser(user).subscribe(res => {
          this.loadUsers();
          Swal.fire(
            'Borrado correctamente',
            `El usuario ${user.name}, ha sido borrado correctamente`,
            'success'
          )
        })
      }
    })
  }

  changeRole(user: User) {    
    this.userService.changeRole(user).subscribe(res => {

      if(user.role === 'ADMIN_ROLE'){
        return Swal.fire( 'Rol cambiado exiosamente',`${user.name} es: ADMINISTRADOR`, 'success');
      }else{
        return Swal.fire( 'Rol cambiado exiosamente',`${user.name} es: USUARIO NORMAL`, 'success');

      }

    },
    error => {
      Swal.fire('Error', error.error.msg, 'error');

    });


  }

  openModal(user: User) {

    this.modalImageService.openModal('users', user.uid, user.image);

  }
}
