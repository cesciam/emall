import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pie-chart-comercio',
  templateUrl: './pie-chart-comercio.component.html',
  styleUrls: ['./pie-chart-comercio.component.css']
})
export class PieChartComercioComponent implements OnInit {

  private categorias: string[];
  private comerciosPorCat: number[];

  public pieChartLabels = ['Sales Q1', 'Sales Q2', 'Sales Q3', 'Sales Q4'];
  public pieChartData = [120, 150, 180, 90];
  public pieChartType = 'pie';
  constructor() { }

  ngOnInit() {
  }

}
