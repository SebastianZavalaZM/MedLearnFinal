import { Component, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
import { ExerciseService } from '../../../services/exercise.service';

Chart.register(...registerables);

@Component({
  selector: 'app-totalejerciciospordieta',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './totalejerciciospordieta.component.html',
  styleUrls: ['./totalejerciciospordieta.component.css'],
})
export class TotalejerciciospordietaComponent implements OnInit {
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

  constructor(private exerciseService: ExerciseService) {}

  ngOnInit(): void {
    this.exerciseService.getTotalExercisesByDiet().subscribe((data) => {
      this.barChartData.labels = data.map((item) => item.description); // Etiquetas basadas en el nombre de la dieta
      this.barChartData.datasets = [
        {
          data: data.map((item) => item.totalExercisesporDieta), // Valores basados en la cantidad de ejercicios
          label: 'Total de Ejercicios',
          backgroundColor: [
            '#4CAF50',
            '#FF9800',
            '#F44336',
            '#2196F3',
            '#9C27B0',
            '#3F51B5',
            '#009688',
            '#CDDC39',
          ],
          borderColor: 'rgba(0, 0, 0, 0.1)',
          borderWidth: 1,
        },
      ];
    });
  }
}
