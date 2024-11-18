import {Component, OnInit} from '@angular/core';
import {BaseChartDirective} from 'ng2-charts';
import {Chart, ChartDataset, ChartOptions, ChartType, registerables} from 'chart.js';
import {privateDecrypt} from 'node:crypto';
import {IllnessService} from '../../../services/illness.service';
import {TreatmentsService} from '../../../services/treatments.service';
////npm install ng2-charts chart.js --save
@Component({
  selector: 'app-reportetratamientoporenfermedad',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './reportetratamientoporenfermedad.component.html',
  styleUrl: './reportetratamientoporenfermedad.component.css'
})
export class ReportetratamientoporenfermedadComponent implements OnInit{
  BarControllerChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };
  barChartLabels: string[] = [];
  barChartType:ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(private tS: TreatmentsService) {}

  ngOnInit(): void {
    this.tS.getCantidad().subscribe((data) => {;
      this.barChartLabels = data.map((item) => item.nameIllness);
      this.barChartData = [
        {
          data: data.map((item) => item.quantityTreatments),
          label: 'Cantidad de tratamientos por enfermedad',
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
