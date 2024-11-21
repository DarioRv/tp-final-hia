import { Component } from '@angular/core';
import { ChangeLogItem } from '../../interfaces/change-log-item.interface';

@Component({
  selector: 'app-change-log-page',
  templateUrl: './change-log-page.component.html',
  styles: [
  ]
})
export class ChangeLogPageComponent {
  changeLogItems: ChangeLogItem[] = [
  ];
}
