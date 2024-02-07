import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import Chart from 'chart.js/auto';
import * as pattern from 'patternomaly';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  DARK_THEME_CLASS = 'dark-theme';
  DARK_THEME_LIGHT = 'light';
  DARK_THEME_DARK = 'dark';

  breakpoint: number | undefined;

  public theme: string = '';

  //? Bar
  myChartBar: any;
  dataChartBar: number[] = [12, 19, 3, 5, 2, 3];
  barLoading: boolean = true;

  //? Bar
  myChartPie: any;
  dataChartPie: number[] = [12, 19, 3, 5, 2, 3];
  pieLoading: boolean = true;

  //? Radar
  myChartRadar: any;
  dataChartRadar: number[] = [20, 40, 33, 35, 30, 38];
  radarLoading: boolean = true;

  //? Lines
  myChartLines: any;
  dataChartLines: number[] = [467, 576, 572, 79, 92, 574, 573, 576];
  dataChartLines2: number[] = [542, 542, 536, 327, 17, 0.0, 538, 541];
  linesLoading: boolean = true;

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.theme = this.document.documentElement.classList.contains(
      this.DARK_THEME_CLASS
    )
      ? this.DARK_THEME_DARK
      : this.DARK_THEME_LIGHT;
  }

  ngOnInit() {
    this.breakpoint = window.innerWidth <= 600 ? 1 : 2;
    this.generateRandomData();
    this.createChart();
  }

  public selectDarkTheme(): void {
    this.document.documentElement.classList.add(this.DARK_THEME_CLASS);
    this.theme = this.DARK_THEME_DARK;

    this.myChartLines.options.scales.x.grid.color = '#8a2be2';
    this.myChartLines.options.scales.y.grid.color = '#8a2be2';

    this.myChartLines.update();
  }

  public selectLightTheme(): void {
    this.document.documentElement.classList.remove(this.DARK_THEME_CLASS);
    this.theme = this.DARK_THEME_LIGHT;

    this.myChartLines.options.scales.x.grid.color = '#eeeeee';
    this.myChartLines.options.scales.y.grid.color = '#eeeeee';
    this.myChartLines.update();
  }

  onResize(event: any) {
    this.breakpoint = event.target.innerWidth <= 600 ? 1 : 2;
  }

  generateRandomData() {
    let lengthBarChart = this.dataChartBar.length;
    let lengthPieChart = this.dataChartBar.length;
    let lengthRadarChart = this.dataChartRadar.length;
    let lengthLinesChart = this.dataChartLines.length;
    let lengthLines2Chart = this.dataChartLines2.length;

    // Generate and array of random values (you can customize this based in your needs)
    this.dataChartBar = Array.from({ length: lengthBarChart }, () =>
      Math.floor(Math.random() * 10 + 1)
    );

    this.dataChartPie = Array.from({ length: lengthPieChart }, () =>
      Math.floor(Math.random() * 10 + 1)
    );

    this.dataChartRadar = Array.from({ length: lengthRadarChart }, () =>
      Math.floor(Math.random() * 40 + 1)
    );

    this.dataChartLines = Array.from({ length: lengthLinesChart }, () =>
      Math.floor(Math.random() * 600 + 1)
    );

    this.dataChartLines2 = Array.from({ length: lengthLines2Chart }, () =>
      Math.floor(Math.random() * 600 + 1)
    );
  }

  createChart() {
    // const barCtx = document.getElementById('myChartBar') as HTMLCanvasElement;
    // const pieCtx = document.getElementById('myChartPie') as HTMLCanvasElement;

    console.log(this.theme);

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
            text: 'Bar Chart',
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: this.theme === 'dark' ? '#FFCF96' : '#dcdcdc',
            },
          },
          x: {
            grid: {
              color: this.theme === 'dark' ? '#FFCF96' : '#dcdcdc',
            },
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

    //? PIE
    this.myChartPie = new Chart('pieCtx', {
      type: 'pie', //this denotes tha type of chart

      data: {
        // values on X-Axis
        labels: ['Red', 'Pink', 'Green', 'Yellow', 'Orange', 'Blue'],
        datasets: [
          {
            label: 'My First Dataset',
            data: [300, 240, 100, 432, 253, 34],
            backgroundColor: [
              pattern.draw('square', '#ff6384'),
              pattern.draw('ring', '#36a2eb'),
              pattern.draw('diamond', '#cc65fe'),
              pattern.draw('triangle', '#ffce56'),
              pattern.draw('line', 'orange'),
              pattern.draw('dash', 'orange'),
            ],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
        responsive: true,
        plugins: {
          legend: {
            position: 'right',
            display: true,
            labels: {
              color: this.theme === 'dark' ? '#FFCF96' : '#dcdcdc',
            },
          },
          title: {
            display: true,
            text: 'Pie Chart',
            padding: {
              // top: 10,
              bottom: 30,
            },
          },
        },
      },
    });

    //? Radar
    this.myChartRadar = new Chart('radarCtx', {
      type: 'radar',
      data: {
        labels: ['HTML', 'CSS', 'JAVASCRIPT', 'CHART.JS', 'JQUERY', 'BOOTSTRP'],
        datasets: [
          {
            label: 'online tutorial subjects',
            data: [20, 40, 33, 35, 30, 38],
            backgroundColor: pattern.draw('weave', 'rgb(255, 99, 132, 0.4)'),
            pointBackgroundColor: [
              'yellow',
              'aqua',
              'pink',
              'lightgreen',
              'lightblue',
              'gold',
            ],
            borderColor: ['black'],
            borderWidth: 1,
            pointRadius: 6,
          },
        ],
      },
      options: {
        responsive: true,
        elements: {
          line: {
            borderWidth: 3,
          },
        },
        scales: {
          r: {
            grid: {
              color: [
                'orange',
                'red',
                'orange',
                'red',
                'orange',
                'red',
                'orange',
              ],
            },
          },
        },
        plugins: {
          legend: {
            position: 'bottom',
            display: true,
            labels: {
              color: this.theme === 'dark' ? '#FFCF96' : '#dcdcdc',
            },
          },
          title: {
            display: true,
            text: 'Radar Chart',
            padding: {
              // top: 10,
              bottom: 30,
            },
          },
        },
      },
    });

    //? Line
    this.myChartLines = new Chart('lineCtx', {
      type: 'line',
      data: {
        // values on X-Axis
        labels: [
          '2022-05-10',
          '2022-05-11',
          '2022-05-12',
          '2022-05-13',
          '2022-05-14',
          '2022-05-15',
          '2022-05-16',
          '2022-05-17',
        ],
        datasets: [
          {
            label: 'Sales',
            data: ['467', '576', '572', '79', '92', '574', '573', '576'],
            backgroundColor: 'blue',
            borderColor: 'orange',
          },
          {
            label: 'Profit',
            data: ['542', '542', '536', '327', '17', '0.00', '538', '541'],
            backgroundColor: 'limegreen',
            borderColor: 'rgb(75, 192, 192)',
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: ' #eeeeee',
            },
          },
          x: {
            grid: {
              color: ' #eeeeee',
            },
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

  reRollRandomValuesPie() {
    this.barLoading = true;
    //Call this function whenever you wandt to re-roll random values
    this.generateRandomData();

    //Update the chart with new data
    this.myChartPie.data.labels = this.dataChartPie.map(
      (_, index) => `Label ${index + 1}`
    );
    this.myChartPie.data.datasets[0].data = this.dataChartPie;
    // Update and redraw the chart
    this.myChartPie.update();
  }

  reRollRandomValuesRadar() {
    this.radarLoading = true;
    //Call this function whenever you wandt to re-roll random values
    this.generateRandomData();

    //Update the chart with new data
    this.myChartRadar.data.labels = this.dataChartRadar.map(
      (_, index) => `Label ${index + 1}`
    );
    this.myChartRadar.data.datasets[0].data = this.dataChartRadar;
    // Update and redraw the chart
    this.myChartRadar.update();
  }

  reRollRandomValuesLine() {
    this.linesLoading = true;
    //Call this function whenever you wandt to re-roll random values
    this.generateRandomData();

    //Update the chart with new data
    this.myChartLines.data.labels = this.dataChartLines.map(
      (_, index) => `Label ${index + 1}`
    );

    this.myChartLines.data.labels = this.dataChartLines2.map(
      (_, index) => `Label ${index + 1}`
    );

    this.myChartLines.data.datasets[0].data = this.dataChartLines;
    this.myChartLines.data.datasets[1].data = this.dataChartLines2;
    // Update and redraw the chart
    this.myChartLines.update();
  }
}
