import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private link = document.querySelector('#theme');


  constructor() {
    const url = localStorage.getItem('theme') || './assets/css/colors/purple-dark.css';

    this.link.setAttribute('href', url);
  }

  changeTheme(color: string) {
    const url = `./assets/css/colors/${color}.css`;

    this.link.setAttribute('href', url);
    localStorage.setItem('theme', url);
  }
}
