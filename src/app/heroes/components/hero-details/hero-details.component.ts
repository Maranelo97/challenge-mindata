import { Component, EventEmitter, Input, Output, OnChanges } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ChartOptions, ChartType } from 'chart.js';
import { Hero } from '../../../core/models/Hero';

@Component({
  selector: 'app-hero-details',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './hero-details.component.html',
  styleUrls: ['./hero-details.component.css'],
})
export class HeroDetailsComponent implements OnChanges {
  @Input() hero!: Hero;
  @Output() close = new EventEmitter<void>();

  public radarChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      r: {
        angleLines: { display: true },
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
    plugins: {
      legend: { display: false },
    },
  };
  public radarChartLabels: string[] = [
    'Intelligence',
    'Strength',
    'Speed',
    'Durability',
    'Power',
    'Combat',
  ];

  public radarChartData = [{ data: [0, 0, 0, 0, 0, 0], label: 'Powerstats' }];
  public radarChartType: ChartType = 'radar';

  ngOnChanges() {
    if (this.hero) {
      this.radarChartData = [
        {
          data: [
            this.hero.powerstats.intelligence,
            this.hero.powerstats.strength,
            this.hero.powerstats.speed,
            this.hero.powerstats.durability,
            this.hero.powerstats.power,
            this.hero.powerstats.combat,
          ],
          label: 'Powerstats',
        },
      ];
    }
  }
}
