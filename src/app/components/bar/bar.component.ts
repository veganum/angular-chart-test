import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css'],
})
export class BarComponent implements OnInit {
  //? Bar
  myChartBar: any;
  dataChartBar: number[] = [12, 19, 3, 5, 2, 3];
  barLoading: boolean = true;

  constructor() {}

  ngOnInit() {
    this.generateRandomData();
    this.createChart();
  }

  generateRandomData() {
    let lengthBarChart = this.dataChartBar.length;
    // Generate and array of random values (you can customize this based in your needs)
    this.dataChartBar = Array.from({ length: lengthBarChart }, () =>
      Math.floor(Math.random() * 10 + 1)
    );
  }

  createChart() {
    // const barCtx = document.getElementById('myChartBar') as HTMLCanvasElement;
    //? BAR
    this.myChartBar = new Chart('barCtx', {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
          {
            label: '# of Votes',
            data: this.dataChartBar,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
          },
          title: {
            display: true,
            text: 'Chart.js Bar Chart',
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        animation: {
          onComplete: () => {
            this.barLoading = true;
          },
          delay: (context) => {
            let delay = 0;
            if (
              context.type === 'data' &&
              context.mode === 'default' &&
              !this.barLoading
            ) {
              delay = context.dataIndex * 300 + context.datasetIndex * 100;
            }
            return delay;
          },
        },
      },
    });
  }

  reRollRandomValuesBar() {
    this.barLoading = true;
    //Call this function whenever you wandt to re-roll random values
    this.generateRandomData();

    //Update the chart with new data
    this.myChartBar.data.labels = this.dataChartBar.map(
      (_, index) => `Label ${index + 1}`
    );
    this.myChartBar.data.datasets[0].data = this.dataChartBar;
    // Update and redraw the chart
    this.myChartBar.update();
  }
}
