import {Component} from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent {

  progressOne: number = 10;
  progressTwo: number = 10;

  get getProgressOne() {
    return `${this.progressOne}%`;
  }

  get getProgressTwo() {
    return `${this.progressTwo}%`;
  }

}
