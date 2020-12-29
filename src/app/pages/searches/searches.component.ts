import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Doctor } from 'src/app/models/doctors.model';
import { Hospital } from 'src/app/models/hospital.model';
import { User } from 'src/app/models/user.model';
import { SearchesService } from 'src/app/services/searches.service';

@Component({
  selector: 'app-searches',
  templateUrl: './searches.component.html',
  styles: [
  ]
})
export class SearchesComponent implements OnInit {

  public users: User[] = [];

  public hospitals: Hospital[] = [];

  public doctors: Doctor[] = [];

  public totalDoctors: number = 0;

  public totalUsers: number = 0;

  public totalHospitals: number = 0;


  constructor(
    private activatedRoute: ActivatedRoute,
    private searchesService: SearchesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ term }) => this.globalSearch(term));

  }
  globalSearch(term) {


    if (term == '') {
      this.router.navigateByUrl(`/dashboard`)
    } else {

      this.searchesService.globalSearch(term).subscribe((res: any) => {

        this.users = res.users;
        this.totalUsers = res.totalUsers;

        this.hospitals = res.hospitals;
        this.totalHospitals = res.totalHospitals;

        this.doctors = res.doctors;
        this.totalDoctors = res.totalDoctors;

      });

    }


  }

}
