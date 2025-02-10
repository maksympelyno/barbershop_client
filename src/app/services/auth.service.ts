import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { API_ENDPOINTS, BASE_URL } from '../constants/api-endpoints';
import { Login, User } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private baseUrl = BASE_URL + API_ENDPOINTS.AUTH;

  username = signal<string>(localStorage.getItem('name') || '');
  role = signal<string>(localStorage.getItem('role') || '');
  branchId = signal<string>(localStorage.getItem('branchId') || '');
  isAuthenticatedSignal = signal<boolean>(!!localStorage.getItem('token'));

  login(model: Login) {
    return this.http.post<User>(this.baseUrl, model).pipe(
      tap((response) => {
        this.username.set(response.name);
        this.role.set(response.role);
        this.branchId.set(response.branchId);
        this.isAuthenticatedSignal.set(true);

        localStorage.setItem('token', response.access_token);
        localStorage.setItem('role', response.role);
        localStorage.setItem('name', response.name);
        localStorage.setItem('branchId', response.branchId);

        this.router.navigate(['/main']);
      })
    );
  }

  logout() {
    this.username.set('');
    this.role.set('');
    this.branchId.set('');
    this.isAuthenticatedSignal.set(false);

    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
    localStorage.removeItem('branchId');

    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSignal();
  }

  getRole(): string {
    return this.role();
  }

  getUserName(): string {
    return this.username();
  }

  getBranchId(): string {
    return this.branchId();
  }
}
