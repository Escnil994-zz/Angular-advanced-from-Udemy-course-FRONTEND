import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit  {

  public user: User;

  public visibles:boolean = false;

  constructor( 
    private userService: UserService,
    private router: Router
    ) { 
    this.user = userService.user;
  }
  ngOnInit(): void {


  }




  logout(){
    this.userService.logout();
  }

  search( term ){

    if ( term == '') {
    this.router.navigateByUrl(`/dashboard/`);
    }
    this.router.navigateByUrl(`/dashboard/search/${term}`);

    document.getElementById('form').style.display='none';

    
  }



}
