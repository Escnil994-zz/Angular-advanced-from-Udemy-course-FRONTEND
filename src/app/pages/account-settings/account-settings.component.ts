import {Component, OnInit} from '@angular/core';
import {SettingsService} from '../../services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  public link = document.querySelector('#theme');

  public links: NodeListOf<Element>;


  constructor(private  settingService: SettingsService) {
  }

  ngOnInit(): void {
    this.links = document.querySelectorAll('.selector');
    this.checkCurrentTheme();

  }

  changeTheme(color: string) {
    this.settingService.changeTheme(color);
    this.checkCurrentTheme();

  }


  checkCurrentTheme() {

    this.links.forEach(elem => {
      elem.classList.remove('working');
      const btnTheme = elem.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;
      const currentTheme = this.link.getAttribute('href');

      if (btnThemeUrl === currentTheme) {
        elem.classList.add('working');
      }
    });

  }
}
