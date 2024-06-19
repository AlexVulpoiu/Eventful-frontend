import {Component, ViewChild} from '@angular/core';
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
import {GeneralStatisticsDto} from "../../dto/statistics/general-statistics-dto";
import {StatisticsService} from "../../services/statistics-service";

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

@Component({
  selector: 'app-general-statistics',
  standalone: true,
    imports: [
        MatCard,
        MatCardContent,
        MatCardTitle,
        MatMiniFabButton,
        NgApexchartsModule,
        TablerIconsModule
    ],
  templateUrl: './general-statistics.component.html',
  styleUrl: './general-statistics.component.scss'
})
export class GeneralStatisticsComponent {
  @ViewChild('chart') chart: ChartComponent = Object.create(null);

  generalStatisticsDto: GeneralStatisticsDto | undefined;
  public salesOverviewChart!: Partial<salesOverviewChart> | any;
  public eventsOverviewChart!: Partial<salesOverviewChart> | any;
  months: string[] = [];
  eventsPerMonth: number[] = [];
  incomePerMonth: number[] = [];

  constructor(private statisticsService: StatisticsService) {
    this.statisticsService.getGeneralStatistics().subscribe(data => {
      this.generalStatisticsDto = data;
      this.months = this.generalStatisticsDto.months;
      this.eventsPerMonth = this.generalStatisticsDto.eventsPerMonth;
      this.incomePerMonth = this.generalStatisticsDto.incomePerMonth;

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
          max: 200,
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
    });
  }
}
