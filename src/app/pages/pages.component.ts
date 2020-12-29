import {Component, OnInit} from '@angular/core';
import {SettingsService} from '../services/settings.service';
import { SidebarService } from '../services/sidebar.service';

declare function customInitFunctions(): any;


@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
})
export class PagesComponent implements OnInit {

  constructor(
    private settingService: SettingsService,
    private sidebarService: SidebarService
  ) {
  }

  ngOnInit() {

    
    customInitFunctions();
    
    this.sidebarService.getMenu();
    

  }


}
