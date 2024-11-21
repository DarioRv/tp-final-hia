import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'auth-layout-page',
  templateUrl: './layout-page.component.html',
  styles: [
  ]
})
export class LayoutPageComponent {
  public items?: MenuItem[];
}
