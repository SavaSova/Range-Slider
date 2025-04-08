import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SliderModule } from 'primeng/slider';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule, FormsModule, SliderModule],
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  ngOnInit(): void {
    document.documentElement.style.setProperty('--p-slider-range-background', '#5CADEA');
    document.documentElement.style.setProperty('--p-slider-track-background', '#EDF1F8');
    document.documentElement.style.setProperty('--p-slider-border-radius', '100px');
    document.documentElement.style.setProperty('--p-slider-track-size', '10px');
    document.documentElement.style.setProperty('--p-content-border-color', '#5CADEA');
    document.documentElement.style.setProperty('--p-slider-handle-content-width', '10px');
    document.documentElement.style.setProperty('--p-slider-handle-content-height', '10px');
  }

  mode: 'years' | 'months' = 'years';
  range: number[] = [16, 50]; // начальные значения

  get max() {
    return this.mode === 'years' ? 84 : 36;
  }

  get ticks(): number[] {
    return this.mode === 'years'
      ? [0, 12, 24, 36, 48, 60, 72, 84]
      : Array.from({ length: 37 }, (_, i) => i);
  }

  setMode(mode: 'years' | 'months') {
    this.mode = mode;
    this.range = mode === 'years' ? [12, 72] : [6, 30];
  }

  getTickLabel(value: number): string {
    if (this.mode === 'years') {
      return String(2014 + Math.floor(value / 12));
    } else {
      const months = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
      const year = 2015 + Math.floor(value / 12);
      const month = months[value % 12];
      return value % 12 === 0 ? `${year}` : month;
    }
  }

  getTooltipText(value: number): string {
    const months = [
      'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
      'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
    ];
    const month = months[value % 12];
    const year = this.mode === 'years'
      ? 2014 + Math.floor(value / 12)
      : 2015 + Math.floor(value / 12);
    return `${month}<br>${year}`;
  } 
  
  isYearTick(value: number): boolean {
    return this.mode === 'months' && value % 12 === 0;
  }
  
}
