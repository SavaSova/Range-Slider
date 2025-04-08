import { Component } from '@angular/core';
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
export class SliderComponent {
  mode: 'years' | 'months' = 'years';
  range: number[] = [12, 72]; // начальные значения

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
    this.range = mode === 'years' ? [12, 72] : [0, 36];
  }

  getTickLabel(value: number): string {
    if (this.mode === 'years') {
      return String(2014 + Math.floor(value / 12));
    } else {
      const months = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];
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
    return `${month} ${year}`;
  }

  onSlide() {
    // При необходимости можно добавить логику
  }
}
