import { Component, Input } from '@angular/core';
import { MultiDataSet, Label, Color } from 'ng2-charts'



@Component({
  selector: 'app-donut',
  templateUrl: './donut.component.html',
  styles: [
  ]
})
export class DonutComponent {

  @Input('title')  donutName: string = '';



  // Doughnut
  @Input('labels') doughnutChartLabels: Label[] = ['Label01', 'Label02', 'Label03'];
  @Input('percents') doughnutChartData: MultiDataSet = [
    [350, 450, 100]
  ];

  public colors: Color[] = [
    { backgroundColor: ['#6857E6', '#009FEE', '#F02059'] }
  ]
}
