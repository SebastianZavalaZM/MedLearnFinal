import { Component } from '@angular/core';
import { Chart, ChartDataset, ChartOptions, ChartType, registerables } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { UsersService } from '../../../services/users.service';
Chart.register(...registerables);

@Component({
  selector: 'app-proporcion-users',
  standalone: true,
  imports: [
    BaseChartDirective,
  ],
  templateUrl: './proporcion-users.component.html',
  styleUrl: './proporcion-users.component.css'
})
export class ProporcionUsersComponent {
  barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'doughnut';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(private uS: UsersService) {}
  ngOnInit(): void {
    this.uS.getUserProportions().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.rol);
      this.barChartData = [
        {
          data: data.map((item) => item.usuarios),
          label: 'Proporcion de Usuarios',
          backgroundColor: [
            '#00e676', // Verde claro
            '#00c853', // Verde brillante
            '#009624', // Verde fuerte
            '#007e1a', // Verde medio oscuro
            '#006400', // Verde oscuro
            '#004d00', // Verde más oscuro
            '#003300', // Verde muy oscuro
            '#001a00', // Verde casi negro
          ],
          borderColor: 'rgba(173, 216, 230, 1)',
          borderWidth: 1,
        },
      ];
    });
  }


}
