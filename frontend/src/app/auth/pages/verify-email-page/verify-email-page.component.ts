import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/auth.service';

@Component({
  templateUrl: './verify-email-page.component.html',
  styles: [
  ]
})
export class VerifyEmailPageComponent implements OnInit {

  verificationStatus: 'verifying' | 'verified' | 'fail' | 'error' = 'verifying';

  constructor(private activatedRoute: ActivatedRoute, private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( ({token}) => {
      this.verifyEmail(token);
    });
  }

  /**
   * Verifies the email of the user with the token provided
   * @param token The token to verify the email
   */
  verifyEmail(token: string): void {
    this.authService.verifyEmail(token)
      .subscribe({
        next: () => {
          this.verificationStatus = 'verified';
        },
        error: (err) => {
          if (err.status == 0) {
            this.verificationStatus = 'error';
            return;
          }
          this.verificationStatus = 'fail';
        }
      });
  }

}
