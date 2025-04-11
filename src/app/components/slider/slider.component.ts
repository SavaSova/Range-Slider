import { Component, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
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
export class SliderComponent implements OnChanges {

  @Input() startYearForYears = 2014;
  @Input() endYearForYears = 2020;

  @Input() startYearForMonths = 2015;
  @Input() endYearForMonths = 2016;

  @Output() rangeChange = new EventEmitter<number[]>();

  onRangeChange(values?: number[]) {
    if (!values) return;
    this.range = values;
    this.rangeChange.emit(this.range);
  }  

  mode: SliderMode = SliderMode.Years;
  SliderMode = SliderMode;

  range: number[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    this.setMode(this.mode);
  }

  setMode(mode: SliderMode) {
    this.mode = mode;
    this.range = mode === SliderMode.Years
      ? [this.getMonthIndex(this.startYearForYears, 0), this.getMonthIndex(this.endYearForYears , 0)] // Янв 2014 – Янв 2020
      : [this.getMonthIndex(this.startYearForMonths, 0), this.getMonthIndex(this.endYearForMonths, 0)]; // Янв 2016 – Янв 2016
  }

  get max() {
    return this.mode === SliderMode.Years
      ? (this.endYearForYears - this.startYearForYears + 1) * 12 
      : (this.endYearForMonths - this.startYearForMonths + 1) * 12;
  }  

  get ticks(): number[] {
    const maxValue = this.max;
    return this.mode === SliderMode.Years
      ? Array.from({ length: this.endYearForYears  - this.startYearForYears + 2 }, (_, i) => i * 12)
      : Array.from({ length: maxValue + 1 }, (_, i) => i);
  }

  getMonthIndex(year: number, month: number): number {
    const baseYear = this.mode === SliderMode.Years 
      ? this.startYearForYears 
      : this.startYearForMonths;
    return (year - baseYear) * 12 + month;
  }    

  getTickLabel(value: number): string {
    if (this.mode === SliderMode.Years) {
      return String(this.startYearForYears + Math.floor(value / 12));
    } else {
      const year = this.startYearForMonths + Math.floor(value / 12);
      const month = SHORT_MONTHS[value % 12];
      return value % 12 === 0 ? `${year}` : month;
    }
  }  

  getTooltipMonth(value: number): string {
    return FULL_MONTHS[value % 12];
  }
  
  getTooltipYear(value: number): number {
    return this.mode === SliderMode.Years
      ? this.startYearForYears + Math.floor(value / 12)
      : this.startYearForMonths + Math.floor(value / 12);
  }  
  
  isYearTick(value: number): boolean {
    return this.mode === SliderMode.Months && value % 12 === 0;
  }  
}
