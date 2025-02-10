import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { API_ENDPOINTS, BASE_URL } from '../constants/api-endpoints';
import { Client, CreateClientDto } from '../models/client.model';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  private baseUrl = BASE_URL + API_ENDPOINTS.CLIENT;
  clients = signal<Client[]>([]);

  constructor(private http: HttpClient) {}

  getClients() {
    this.http
      .get<Client[]>(this.baseUrl)
      .subscribe((data) => this.clients.set(data));
  }

  addClient(client: CreateClientDto): Observable<Client> {
    return this.http.post<Client>(this.baseUrl, client).pipe(
      tap(() => this.getClients()),
      catchError((error) => {
        console.error('Error adding client:', error);
        return throwError(() => error);
      })
    );
  }

  searchClients(phone: string): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.baseUrl}/search?phone=${phone}`);
  }

  getClientsObservable(): Observable<Client[]> {
    return this.http.get<Client[]>(this.baseUrl);
  }
}
