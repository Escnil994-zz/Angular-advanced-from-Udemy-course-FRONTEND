import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy{

  public title: string;
  public tittleUnSubs$: Subscription;

  constructor(private router: Router) {
    this.subscribeWorking();
  }
  ngOnDestroy(): void {
    this.tittleUnSubs$.unsubscribe();
  }


  chageTitle() {
    return this.router.events.pipe(filter(event => event instanceof ActivationEnd),
      filter((event: ActivationEnd) => event.snapshot.firstChild === null),
      map((event: ActivationEnd) => event.snapshot.data)
    )
  }

  subscribeWorking(){
    this.tittleUnSubs$ = this.chageTitle().subscribe(({ title }) => {
      //console.log(data)

      this.title = title;


      //Cambiar el titulo de la barra de direcciones
      document.title = `Escnil994 - ${title}`;
    })
  }

}
