import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { API_ENDPOINTS, BASE_URL } from '../constants/api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  private baseUrl = BASE_URL + API_ENDPOINTS.CLIENT;
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

  searchClients(phone: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/search?phone=${phone}`);
  }

  getClientsObs(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }
}
