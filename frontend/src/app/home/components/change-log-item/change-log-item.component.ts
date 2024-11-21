import { Component, Input } from '@angular/core';
import { ChangeLogItem } from '../../interfaces/change-log-item.interface';

@Component({
  selector: 'change-log-item',
  templateUrl: './change-log-item.component.html',
  styles: [
  ]
})
export class ChangeLogItemComponent {
  @Input({required: true})
  log!: ChangeLogItem;
}
