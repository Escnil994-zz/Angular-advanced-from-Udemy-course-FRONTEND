import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styles: []
})
export class PromisesComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
    this.getUsers().then(users => {
      console.log(users);
    });
    // const promise = new Promise((resolve, reject) => {
    //   if (false){
    //     resolve('Hello from Promise');
    //   }else {
    //     reject('Something is wrong');
    //   }
    // });
    // promise.then( (message) => {
    //   console.log(message);
    // }).catch(reject => {
    //   console.log(reject);
    // });
    // console.log('Hello from outside of promise');
  }

  getUsers() {
      const promesa = new Promise(resolve => {
      fetch('https://reqres.in/api/users')
        .then(resp => resp.json())
        .then(body => resolve(body.data));
    });
      return promesa;

  }

}
