import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class VisitsService {
  private baseUrl = 'http://localhost:5000/visit';
  visits = signal<any[]>([]);

  constructor(private http: HttpClient) {}

  getVisits() {
    this.http
      .get<any[]>(this.baseUrl)
      .subscribe((data) => this.visits.set(data));
  }
}
