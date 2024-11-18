import { Component, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';
import {  ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { DietService } from '../../../services/diet.service';
Chart.register(...registerables);
@Component({
  selector: 'app-numberdietinityfin',
  standalone: true,
  imports: [BaseChartDirective,],
  templateUrl: './numberdietinityfin.component.html',
  styleUrl: './numberdietinityfin.component.css'
})
export class NumberdietinityfinComponent implements OnInit{
  //Configuración primer gráfico sobre cantidad de dietas iniciadas
  barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];
  //Configuración segundo gráfico sobre cantidad de dietas finalizadas
  barChartOptions1: ChartOptions = {
    responsive: true,
  };
  barChartLabels1: string[] = [];
  barChartType1: ChartType = 'bar';
  barChartLegend1 = true;
  barChartData1: ChartDataset[] = [];

  constructor(private dS: DietService) {}
  ngOnInit(): void {
    this.dS.getQuantityBydietsinicidasydietsfinalizadasbyuser().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.username);
      this.barChartData = [
        {
          data: data.map((item) => item.cantidadDeDietasIniciadas),
          label: 'Cantidad de dietas iniciadas',
          backgroundColor: [
            '#FF0000',
            '#FF4500',
            '#FF6347',
            '#FF7F50',
            '#CD5C5C',
            '#D2691E',
            '#B22222',
            '#800000',
          ],
          borderColor: 'rgba(173, 216, 230, 1)',
          borderWidth: 1,
        },
      ];
      this.barChartLabels1 = data.map((item) => item.username);
      this.barChartData1 = [
        {
          data: data.map((item) => item.cantidadDietasFinalizadas),
          label: 'Cantidad de dietas finalizadas',
          backgroundColor: [
            '#FF0000',
            '#FF4500',
            '#FF6347',
            '#FF7F50',
            '#CD5C5C',
            '#D2691E',
            '#B22222',
            '#800000',
          ],
          borderColor: 'rgba(173, 216, 230, 1)',
          borderWidth: 1,
        },
      ];
    });
  }
}
