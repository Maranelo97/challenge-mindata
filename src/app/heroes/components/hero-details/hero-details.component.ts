import { Component, EventEmitter, Input, Output, OnChanges, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  Chart,
  RadarController,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Hero } from '../../../core/models/Hero';

// Registro necesario para Radar Chart en Chart.js v3+
Chart.register(
  RadarController,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

@Component({
  selector: 'app-hero-details',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './hero-details.component.html',
  styleUrls: ['./hero-details.component.css'],
})
export class HeroDetailsComponent implements OnChanges, AfterViewInit {
  @Input() hero!: Hero;
  @Output() close = new EventEmitter<void>();

  @ViewChild('radarChart') radarChartRef!: ElementRef<HTMLCanvasElement>;

  private chart!: Chart;

  ngAfterViewInit() {
    this.createChart();
  }

  ngOnChanges() {
    if (this.chart && this.hero) {
      this.updateChartData();
    }
  }

  private createChart() {
    const ctx = this.radarChartRef.nativeElement.getContext('2d');
    if (!ctx) return;

    this.chart = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: [
          'Intelligence',
          'Strength',
          'Speed',
          'Durability',
          'Power',
          'Combat',
        ],
       datasets: [
  {
    label: 'Powerstats',
    data: this.getHeroPowerstats(),
    backgroundColor: 'rgba(255, 64, 129, 0.2)', // rosa neón semi transparente
    borderColor: '#ff4081',                      // rosa intenso
    borderWidth: 3,
    pointBackgroundColor: '#ff80ab',             // rosa claro
    pointBorderColor: '#e040fb',                  // un rosa más fuerte para bordes
    pointHoverBackgroundColor: '#e040fb',
    pointHoverBorderColor: '#ff80ab',
  },
],
      },
      options: {
        responsive: true,
        scales: {
          r: {
            angleLines: { display: true },
            suggestedMin: 0,
            suggestedMax: 100,
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
  }

  private updateChartData() {
    this.chart.data.datasets[0].data = this.getHeroPowerstats();
    this.chart.update();
  }

  private getHeroPowerstats(): number[] {
    return [
      +this.hero.powerstats.intelligence || 0,
      +this.hero.powerstats.strength || 0,
      +this.hero.powerstats.speed || 0,
      +this.hero.powerstats.durability || 0,
      +this.hero.powerstats.power || 0,
      +this.hero.powerstats.combat || 0,
    ];
  }
}
