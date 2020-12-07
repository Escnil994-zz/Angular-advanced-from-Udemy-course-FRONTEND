import { Component, OnDestroy } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import { map, filter, take } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnDestroy {

  public intervalSubs: Subscription;

  constructor() {
    // this.returnObservable().pipe(retry(1)).subscribe(
    //   valor => console.log('número: ', valor),
    //   error => console.warn('Error: ', error),
    //   () => console.log('Observable finished')
    // );

   this.intervalSubs = this.returnInterval().subscribe((valor) => console.log(valor));
  }

  //Destroy subscription
  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

  returnInterval(): Observable<number> {
    return interval(100).pipe(
      //take(10),
      map(valor => valor + 1),
      filter(predicate => (predicate % 2 === 0) ? true : false)
    );
  }


  returnObservable(): Observable<number> {
    let i = -1;

    const obs$ = new Observable<number>(observer => {

      const intervalo = setInterval(() => {
        i++;
        observer.next(i);
        if (i === 10) {
          clearInterval(intervalo);
          observer.complete();
        }
        if (i === 5) {
          i = 0;
          observer.error('I llegó al valor de 5');
        }
      }, 1000);
    });
    return obs$;
  }


}
