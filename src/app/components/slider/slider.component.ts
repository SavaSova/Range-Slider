import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Slider } from 'primeng/slider';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [FormsModule, Slider, InputTextModule],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css'
})
export class SliderComponent {
  rangeValues: number[] = [20, 80];

}
