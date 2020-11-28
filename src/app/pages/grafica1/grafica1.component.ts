import { Component } from '@angular/core';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {

  public labels1: string[] = ['Pan', 'Refrescos', 'Tacos'];

  public data1 = [
    [10, 20, 40],
  ];

  public labels2: string[] = ['Camisa', 'Pantalon', 'Zapatos'];

  public data2 = [
    [60, 85, 40],
  ];

  public labels3: string[] = ['Harina', 'Leche', 'Azucar'];

  public data3 = [
    [41, 22, 60],
  ];

  public labels4: string[] = ['Pollo', 'Carne', 'Chorizo'];

  public data4 = [
    [100, 60, 40],
  ];
}
