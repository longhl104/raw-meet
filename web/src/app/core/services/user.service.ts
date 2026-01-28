import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models';
import { environment } from '../../../environments/environment.local';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/users`;

  getUserById(userId: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${userId}`);
  }

  updateProfile(userId: string, data: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${userId}`, data);
  }

  searchUsers(query: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/search`, {
      params: { q: query }
    });
  }
}
