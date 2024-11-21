import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../../interfaces/menu-item.interface';

@Component({
  selector: 'shared-menubar',
  templateUrl: './menubar.component.html',
  styles: [],
})
export class MenubarComponent implements OnInit {
  public items?: MenuItem[];

  ngOnInit(): void {
    this.items = [
      {
        label: 'Home',
        routerLink: '/app',
      },
      {
        label: 'Acerca de',
        items: [
          {
            label: 'Manual',
            routerLink: '/app/manual',
          },
          {
            label: 'Change log',
            routerLink: '/app/change-log',
          },
        ],
      },
      {
        label: 'Ingresar',
        routerLink: '/auth/sign-in',
      },
      {
        label: 'Registrarme',
        routerLink: '/auth/sign-up',
      },
    ];
  }
}
