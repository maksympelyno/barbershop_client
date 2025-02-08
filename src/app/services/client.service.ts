import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  private baseUrl = 'http://localhost:5000/client';
  clients = signal<any[]>([]);

  constructor(private http: HttpClient) {}

  getClients() {
    this.http
      .get<any[]>(this.baseUrl)
      .subscribe((data) => this.clients.set(data));
  }

  addClient(client: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, client).pipe(
      tap(() => this.getClients()),
      catchError((error) => {
        console.error('Error adding client:', error);
        return throwError(() => error);
      })
    );
  }
}
