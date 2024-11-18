import {Component, OnInit} from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import {ChartDataset, ChartOptions, ChartType} from 'chart.js';
import {TreatmentsService} from '../../../services/treatments.service';

@Component({
  selector: 'app-promedioduraciontratamiento',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './promedioduraciontratamiento.component.html',
  styleUrl: './promedioduraciontratamiento.component.css'
})
export class PromedioduraciontratamientoComponent implements OnInit{
  BarControllerChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartOptions: ChartOptions = {
    responsive: true,
  }
  barchartLabels: string[] = [];
  barChartType : ChartType='bar';
  barChartLegend=true;
  barChartData:ChartDataset[] = [];

  constructor(private tS :TreatmentsService) { }

  ngOnInit(): void {
    this.tS.getAverage().subscribe(data => {;
      this.barchartLabels = data.map(item => item.treatmentDescription);
      this.barChartData = [
        {
          data: data.map(item => item.averageDuration),
          label: 'promedio de duracion de tratamiento',
          backgroundColor: ['green','black','white' ],
          borderColor: ['rgba(255, 99, 132, 1)','green','blue'],
          borderWidth: 1
        }
      ];


    });

  }




}

