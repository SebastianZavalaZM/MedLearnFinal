import { Component, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
import { FoodService } from '../../../services/food.service';

Chart.register(...registerables);

@Component({
  selector: 'app-totalcaloriaspordieta',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './totalcaloriaspordieta.component.html',
  styleUrls: ['./totalcaloriaspordieta.component.css'],
})
export class TotalcaloriaspordietaComponent implements OnInit {
  // Configuración del gráfico
  barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };
  barChartType: ChartType = 'bar';
  barChartLegend = true;

  // Datos del gráfico
  barChartData: ChartData<'bar'> = {
    labels: [], // Etiquetas dinámicas
    datasets: [], // Conjunto de datos dinámicos
  };

  constructor(private foodService: FoodService) {}

  ngOnInit(): void {
    this.foodService.getTotalCaloriesByDiet().subscribe((data) => {
      this.barChartData.labels = data.map((item) => item.description);
      this.barChartData.datasets = [
        {
          data: data.map((item) => item.totalCaloriesPorDieta),
          label: 'Total de Calorías',
          backgroundColor: [
            '#008080',
            '#20B2AA',
            '#5F9EA0',
            '#4682B4',
            '#1E90FF',
            '#00CED1',
            '#7FFFD4',
            '#40E0D0',
          ],
          borderColor: 'rgba(0, 0, 0, 0.1)',
          borderWidth: 1,
        },
      ];
    });
  }
}
