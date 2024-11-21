import { Component, Input } from '@angular/core';
import { Step } from '../../interfaces/step.interface';

@Component({
  selector: 'step-card',
  templateUrl: './step-card.component.html',
  styles: [
    `
    .step-card .step-content {
      background: linear-gradient(180deg, rgba(2,0,36,1) 0%, rgba(30,50,100,1) 0%, rgba(104,53,123,1) 72%, rgba(201,57,154,1) 100%);
    }
    `
  ]
})
export class StepCardComponent {
  @Input({required: true}) step!: Step;
}
