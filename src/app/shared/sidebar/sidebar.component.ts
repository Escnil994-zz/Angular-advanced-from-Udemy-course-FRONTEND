import {Component} from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import {SidebarService} from '../../services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent  {

  menuItems: any[];
  constructor(
    private sidebarService: SidebarService,
    private userService: UserService
    ) {
    this.menuItems = sidebarService.menu;
  }



  logout(){
    this.userService.logout();
  }

}
