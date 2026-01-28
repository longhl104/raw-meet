import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-callback',
  imports: [MatProgressSpinnerModule],
  template: `
    <div class=\"callback-container\">\n      <mat-spinner></mat-spinner>\n      <p>Processing authentication...</p>\n    </div>\n  `,
  styles: [`
    .callback-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: calc(100vh - 64px);
      gap: 2rem;
      
      p {
        color: #666;
        font-size: 1.1rem;
      }
    }
  `]
})
export class CallbackComponent implements OnInit {
  private router = inject(Router);

  ngOnInit(): void {
    // TODO: Handle OAuth callback from Cognito
    // Parse URL parameters and exchange code for tokens
    // For now, redirect to feed
    setTimeout(() => {
      this.router.navigate(['/feed']);
    }, 2000);
  }
}
