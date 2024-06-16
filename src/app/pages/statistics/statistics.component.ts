import {Component, ViewChild} from '@angular/core';
import {StatisticsService} from "../../services/statistics-service";
import {OrganiserStatisticsDto} from "../../dto/statistics/organiser-statistics-dto";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatMiniFabButton} from "@angular/material/button";
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels, ApexFill, ApexGrid, ApexLegend, ApexMarkers,
  ApexPlotOptions, ApexResponsive, ApexStroke, ApexTooltip, ApexXAxis,
  ApexYAxis, ChartComponent,
  NgApexchartsModule
} from "ng-apexcharts";
import {TablerIconsModule} from "angular-tabler-icons";

export interface salesOverviewChart {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  grid: ApexGrid;
  marker: ApexMarkers;
}

export interface yearlyChart {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  responsive: ApexResponsive;
}

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatCardTitle,
    MatMiniFabButton,
    NgApexchartsModule,
    TablerIconsModule
  ],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss'
})
export class StatisticsComponent {
  @ViewChild('chart') chart: ChartComponent = Object.create(null);

  organiserStatisticsDto: OrganiserStatisticsDto | undefined;
  public salesOverviewChart!: Partial<salesOverviewChart> | any;
  public eventsOverviewChart!: Partial<salesOverviewChart> | any;
  public yearlyChart!: Partial<yearlyChart> | any;
  months: string[] = [];
  eventsPerMonth: number[] = [];
  incomePerMonth: number[] = [];

  constructor(private statisticsService: StatisticsService) {
    this.statisticsService.getStatistics().subscribe(data => {
      this.organiserStatisticsDto = data;
      this.months = this.organiserStatisticsDto.months;
      this.eventsPerMonth = this.organiserStatisticsDto.eventsPerMonth;
      this.incomePerMonth = this.organiserStatisticsDto.incomePerMonth;

      this.salesOverviewChart = {
        series: [
          {
            name: 'Earnings this month',
            data: this.incomePerMonth,
            color: '#10e05c',
          },
        ],

        grid: {
          borderColor: 'rgba(0,0,0,0.1)',
          strokeDashArray: 3,
          xaxis: {
            lines: {
              show: false,
            },
          },
        },
        plotOptions: {
          bar: {horizontal: false, columnWidth: '35%', borderRadius: [4]},
        },
        chart: {
          type: 'bar',
          height: 390,
          offsetX: -15,
          toolbar: {show: true},
          foreColor: '#adb0bb',
          fontFamily: 'inherit',
          sparkline: {enabled: false},
        },
        dataLabels: {enabled: false},
        markers: {size: 0},
        legend: {show: false},
        xaxis: {
          type: 'category',
          categories: this.months,
          labels: {
            style: {cssClass: 'grey--text lighten-2--text fill-color'},
          },
        },
        yaxis: {
          show: true,
          min: 0,
          max: 2000,
          tickAmount: 4,
          labels: {
            style: {
              cssClass: 'grey--text lighten-2--text fill-color',
            },
          },
        },
        stroke: {
          show: true,
          width: 3,
          lineCap: 'butt',
          colors: ['transparent'],
        },
        tooltip: {theme: 'light'},

        responsive: [
          {
            breakpoint: 600,
            options: {
              plotOptions: {
                bar: {
                  borderRadius: 3,
                },
              },
            },
          },
        ],
      };

      this.eventsOverviewChart = {
        series: [
          {
            name: 'Organised events',
            data: this.eventsPerMonth,
            color: '#5D87FF',
          },
        ],

        grid: {
          borderColor: 'rgba(0,0,0,0.1)',
          strokeDashArray: 3,
          xaxis: {
            lines: {
              show: false,
            },
          },
        },
        plotOptions: {
          bar: {horizontal: false, columnWidth: '35%', borderRadius: [4]},
        },
        chart: {
          type: 'bar',
          height: 390,
          offsetX: -15,
          toolbar: {show: true},
          foreColor: '#adb0bb',
          fontFamily: 'inherit',
          sparkline: {enabled: false},
        },
        dataLabels: {enabled: false},
        markers: {size: 0},
        legend: {show: false},
        xaxis: {
          type: 'category',
          categories: this.months,
          labels: {
            style: {cssClass: 'grey--text lighten-2--text fill-color'},
          },
        },
        yaxis: {
          show: true,
          min: 0,
          max: 5,
          tickAmount: 5,
          labels: {
            style: {
              cssClass: 'grey--text lighten-2--text fill-color',
            },
          },
        },
        stroke: {
          show: true,
          width: 3,
          lineCap: 'butt',
          colors: ['transparent'],
        },
        tooltip: {theme: 'light'},

        responsive: [
          {
            breakpoint: 600,
            options: {
              plotOptions: {
                bar: {
                  borderRadius: 3,
                },
              },
            },
          },
        ],
      };

      this.yearlyChart = {
        series: [this.organiserStatisticsDto?.causesThisYear!, this.organiserStatisticsDto?.causesLastYear!],

        chart: {
          type: 'donut',
          fontFamily: "'Plus Jakarta Sans', sans-serif;",
          foreColor: '#adb0bb',
          toolbar: {
            show: false,
          },
          height: 130,
        },
        colors: ['#5D87FF', '#14cc65'],
        plotOptions: {
          pie: {
            startAngle: 0,
            endAngle: 360,
            donut: {
              size: '75%',
              background: 'transparent',
            },
          },
        },
        stroke: {
          show: false,
        },
        dataLabels: {
          enabled: false,
        },
        legend: {
          show: false,
        },
        responsive: [
          {
            breakpoint: 991,
            options: {
              chart: {
                width: 120,
              },
            },
          },
        ],
        tooltip: {
          enabled: true,
          y: {
            formatter: function (value: number) {
              return value
            },
            title: {
              formatter: function (seriesName: any) {
                return ''
              }
            }
          },
        },
      };
    });
  }
}
