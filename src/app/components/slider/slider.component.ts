import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SliderModule } from 'primeng/slider';
import { CommonModule } from '@angular/common';
import { SliderMode } from './slider-mode.enum';
import { SHORT_MONTHS, FULL_MONTHS } from './slider.constants';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule, FormsModule, SliderModule],
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  readonly START_YEAR_YEARS = 2014;
  readonly END_YEAR_YEARS = 2020;

  readonly START_YEAR_MONTHS = 2015;
  readonly END_YEAR_MONTHS = 2016;

  mode: SliderMode = SliderMode.Years;
  SliderMode = SliderMode;

  range: number[] = [];

  ngOnInit(): void {
    this.setMode(this.mode);
  }

  setMode(mode: SliderMode) {
    this.mode = mode;
    this.range = mode === SliderMode.Years
      ? [this.getMonthIndex(2014, 0), this.getMonthIndex(2020, 11)] // Янв 2014 – Дек 2020
      : [this.getMonthIndex(2015, 6), this.getMonthIndex(2016, 6)]; // Июль 2016 – Июль 2017
  }

  get max() {
    return this.mode === SliderMode.Years
      ? (this.END_YEAR_YEARS - this.START_YEAR_YEARS + 1) * 12 
      : (this.END_YEAR_MONTHS - this.START_YEAR_MONTHS + 1) * 12;
  }  

  get ticks(): number[] {
    const maxValue = this.max;
    return this.mode === SliderMode.Years
      ? Array.from({ length: this.END_YEAR_YEARS - this.START_YEAR_YEARS + 1 }, (_, i) => i * 12)
      : Array.from({ length: maxValue + 1 }, (_, i) => i);
  }

  getMonthIndex(year: number, month: number): number {
    const baseYear = this.mode === SliderMode.Years ? this.START_YEAR_YEARS : this.START_YEAR_MONTHS;
    return (year - baseYear) * 12 + month;
  }  

  getTickLabel(value: number): string {
    if (this.mode === SliderMode.Years) {
      return String(2014 + Math.floor(value / 12));
    } else {
      const months = SHORT_MONTHS;
      const year = 2015 + Math.floor(value / 12);
      const month = months[value % 12];
      return value % 12 === 0 ? `${year}` : month;
    }
  }

  getTooltipMonth(value: number): string {
    return FULL_MONTHS[value % 12];
  }
  
  getTooltipYear(value: number): number {
    return this.mode === SliderMode.Years
      ? this.START_YEAR_YEARS + Math.floor(value / 12)
      : this.START_YEAR_MONTHS + Math.floor(value / 12);
  }  
  
  isYearTick(value: number): boolean {
    return this.mode === SliderMode.Months && value % 12 === 0;
  }  
}
