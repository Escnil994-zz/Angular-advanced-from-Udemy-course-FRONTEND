import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-increment',
  templateUrl: './increment.component.html',
  styles: []
})
export class IncrementComponent implements OnInit{

  ngOnInit(){
    this.btnClass = `btn ${this.btnClass}`;
  }

  //You can rename the property progress
  // @Input() public progress: number;
  @Input('inputValue')  progress: number = 10;
  @Input() btnClass: string = 'btn-primary';

  @Output() outputValue: EventEmitter<number> = new EventEmitter<number>();

  
  changeValue(value: number) {
    if (this.progress >= 100 && value >= 0) {
      this.outputValue.emit(100);
      return this.progress = 100;
    }
    if (this.progress <= 0 && value < 0) {
      this.outputValue.emit(0);
      return this.progress = 0;
    }
    this.progress = this.progress + value;
    this.outputValue.emit(this.progress);

  }

  onChange(value: number){
    if (value >= 100) {
      this.progress = 100;
    } else if(value <= 0) {
      this.progress = 0;
    } else{
      this.progress = value;
    }

    this.outputValue.emit(this.progress);
  }

}
