import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {


  public  menu = [];

  getMenu(){
    this.menu = JSON.parse( localStorage.getItem('menu') );
    return this.menu;
  }

 /*  menu: any[] = [
    {
      title: 'Dashboard',
      icon: 'mdi mdi-gauge',
      submenu: [
        {
          title: 'Main', url: '/'
        },
        {
          title: 'ProgressBar', url: 'progress'
        },
        {
          title: 'Graphics', url: 'grafica1'
        },
        {
          title: 'Promesas', url: 'promises'
        },
        {
          title: 'Rxjs', url: 'rxjs'
        }
      ]
    },
    {
      title: 'Mantenimiento',
      icon: 'mdi mdi-folder-lock-open',
      submenu: [
        {
          title: 'Usuarios', url: 'users'
        },
        {
          title: 'Hospitales', url: 'hospitals'
        },
        {
          title: 'Doctores', url: 'doctors'
        }
      ]
    }
  ];

  constructor() {
  } */
}
