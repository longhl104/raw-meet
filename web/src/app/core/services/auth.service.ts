import { Injectable, signal, computed } from '@angular/core';
import { User } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSignal = signal<User | null>(null);
  
  currentUser = this.currentUserSignal.asReadonly();
  isAuthenticated = computed(() => this.currentUser() !== null);

  async login(email: string, password: string): Promise<void> {
    // TODO: Implement Cognito authentication
    // Mock implementation
    const mockUser: User = {
      id: '1',
      username: 'testuser',
      email,
      displayName: 'Test User',
      createdAt: new Date()
    };
    this.currentUserSignal.set(mockUser);
  }

  async loginWithGoogle(): Promise<void> {
    // TODO: Implement Google OAuth via Cognito
    console.log('Google login not yet implemented');
  }

  async logout(): Promise<void> {
    // TODO: Implement Cognito logout
    this.currentUserSignal.set(null);
  }

  async refreshToken(): Promise<void> {
    // TODO: Implement token refresh
  }
}
