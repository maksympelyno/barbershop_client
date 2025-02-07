import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
}
