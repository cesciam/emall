import { Component, OnInit } from '@angular/core';
import { ReporteService } from 'src/app/services/reporte.service';
import { Reporte } from 'src/app/models/Reporte';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-pie-chart-comercio',
  templateUrl: './pie-chart-comercio.component.html',
  styleUrls: ['./pie-chart-comercio.component.css']
})
export class PieChartComercioComponent implements OnInit {

   categorias: string[] = [];
   comerciosPorCat: number[] = [];
   reportes: Reporte[] = [];

  public pieChartLabels = [];
  public pieChartData = [];
  public pieChartType = 'pie';
  public randomColor = [];
  public pieColors = [];
  constructor( private service: ReporteService) {
   }

  ngOnInit() {
    this.service.getComercioPorCat()
    .subscribe(
      (data: Reporte[]) => {
        for (const report of data) {
          this.pieChartLabels.push(report.nombre);
          this.pieChartData.push(report.cantidad);
          this.randomColor.push(this.getRandomColor());
        }

        this.pieColors = [{
          backgroundColor: this.randomColor
        }];
      },
      (err: any) => console.log(err)
    );
  }

  getRandomColor() {
    var rgba = 'rgba(' +
    (Math.floor(Math.random() * ( 256 - 1 ) + 1)) + ', ' +
    (Math.floor(Math.random() * ( 256 - 1 ) + 1)) + ', ' +
    '171' + ', ' + '1)';

    console.log(rgba);

    return rgba;
  }
}
