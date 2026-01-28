import { Component, signal, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule
  ],
  template: `
    <div class=\"login-container\">\n      <mat-card class=\"login-card\">\n        <mat-card-header>\n          <h1>Welcome to Raw Meet</h1>\n          <p>Sign in to view and comment on authentic moments</p>\n        </mat-card-header>\n        \n        <mat-card-content>\n          <button mat-raised-button color=\"primary\" class=\"google-btn\" (click)=\"loginWithGoogle()\">\n            <mat-icon>login</mat-icon>\n            Continue with Google\n          </button>\n          \n          <mat-divider class=\"divider\">\n            <span>or</span>\n          </mat-divider>\n          \n          <form [formGroup]=\"loginForm\" (ngSubmit)=\"onSubmit()\">\n            <mat-form-field appearance=\"outline\" class=\"full-width\">\n              <mat-label>Email</mat-label>\n              <input matInput type=\"email\" formControlName=\"email\" autocomplete=\"email\">\n              @if (loginForm.get('email')?.hasError('required')) {\n                <mat-error>Email is required</mat-error>\n              }\n              @if (loginForm.get('email')?.hasError('email')) {\n                <mat-error>Enter a valid email</mat-error>\n              }\n            </mat-form-field>\n            \n            <mat-form-field appearance=\"outline\" class=\"full-width\">\n              <mat-label>Password</mat-label>\n              <input matInput [type]=\"hidePassword() ? 'password' : 'text'\" formControlName=\"password\" autocomplete=\"current-password\">\n              <button mat-icon-button matSuffix type=\"button\" (click)=\"togglePassword()\">\n                <mat-icon>{{ hidePassword() ? 'visibility_off' : 'visibility' }}</mat-icon>\n              </button>\n              @if (loginForm.get('password')?.hasError('required')) {\n                <mat-error>Password is required</mat-error>\n              }\n            </mat-form-field>\n            \n            @if (errorMessage()) {\n              <div class=\"error-message\">\n                {{ errorMessage() }}\n              </div>\n            }\n            \n            <button mat-raised-button color=\"accent\" type=\"submit\" class=\"full-width\" [disabled]=\"!loginForm.valid || loading()\">\n              @if (loading()) {\n                <span>Signing in...</span>\n              } @else {\n                <span>Sign In</span>\n              }\n            </button>\n          </form>\n        </mat-card-content>\n      </mat-card>\n      \n      <p class=\"note\">\n        📱 <strong>Note:</strong> To post photos and videos, download the mobile app. Web version is for viewing and commenting only.\n      </p>\n    </div>\n  `,
  styles: [`
    .login-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: calc(100vh - 64px);
      padding: 2rem;
      
      .login-card {
        width: 100%;
        max-width: 450px;
        
        mat-card-header {
          text-align: center;
          padding: 2rem 2rem 1rem 2rem;
          
          h1 {
            margin: 0 0 0.5rem 0;
            font-size: 1.75rem;
          }
          
          p {
            margin: 0;
            color: #666;
          }
        }
        
        mat-card-content {
          padding: 2rem;
          
          .google-btn {
            width: 100%;
            height: 48px;
            font-size: 1rem;
            margin-bottom: 1.5rem;
          }
          
          .divider {
            margin: 1.5rem 0;
            position: relative;
            text-align: center;
            
            span {
              background-color: white;
              padding: 0 1rem;
              color: #999;
              position: relative;
              z-index: 1;
            }
          }
          
          form {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            
            .full-width {
              width: 100%;
            }
            
            .error-message {
              background-color: #ffebee;
              color: #c62828;
              padding: 0.75rem;
              border-radius: 4px;
              font-size: 0.875rem;
            }
          }
        }
      }
      
      .note {
        margin-top: 2rem;
        padding: 1rem 2rem;
        background-color: #fff3cd;
        border-left: 4px solid #ffc107;
        border-radius: 4px;
        color: #856404;
        max-width: 450px;
        text-align: center;
      }
    }
  `]
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  
  hidePassword = signal(true);
  loading = signal(false);
  errorMessage = signal('');
  
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  togglePassword(): void {
    this.hidePassword.update(v => !v);
  }

  async onSubmit(): Promise<void> {
    if (!this.loginForm.valid) return;
    
    this.loading.set(true);
    this.errorMessage.set('');
    
    try {
      const { email, password } = this.loginForm.value;
      await this.authService.login(email!, password!);
      await this.router.navigate(['/feed']);
    } catch (error) {
      this.errorMessage.set('Invalid email or password');
      this.loading.set(false);
    }
  }

  async loginWithGoogle(): Promise<void> {
    try {
      await this.authService.loginWithGoogle();
    } catch (error) {
      this.errorMessage.set('Google login failed. Please try again.');
    }
  }
}
