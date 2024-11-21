import { Component } from '@angular/core';

@Component({
  templateUrl: './password-update-page.component.html',
  styles: [
  ]
})
export class PasswordUpdatePageComponent {
  status: 'pending' | 'success' | 'fail' | 'error' = 'pending';

  onChangeStatus(status: 'pending' | 'success' | 'fail' | 'error'): void {
    this.status = status;
  }
}
