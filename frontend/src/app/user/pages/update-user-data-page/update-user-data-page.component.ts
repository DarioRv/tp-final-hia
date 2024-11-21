import { Component } from '@angular/core';

@Component({
  templateUrl: './update-user-data-page.component.html',
  styles: [
  ]
})
export class UpdateUserDataPageComponent {
  status: 'pending' | 'success' | 'fail' | 'error' = 'pending';

  setStatus(status: 'success' | 'fail' | 'error'): void {
    this.status = status;
  }
}
