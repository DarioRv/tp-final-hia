import { Component } from '@angular/core';

@Component({
  templateUrl: './reset-password-page.component.html',
  styles: [
  ]
})
export class ResetPasswordPageComponent {
  status: 'success' | 'error' | 'fail' | 'pending' = 'pending';

  setStatus(status: 'success' | 'error' | 'fail' | 'pending'): void {
    this.status = status;
  }
}
