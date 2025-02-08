import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap } from 'rxjs';

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

  addVisit(visit: any): Observable<any> {
    const visitPayload = {
      client: visit.clientId,
      haircut: visit.haircutId,
      date: visit.date,
    };

    return this.http.post<any>(this.baseUrl, visitPayload).pipe(
      tap(() => this.getVisits()), // Оновлюємо список візитів після додавання
      catchError((error) => {
        console.error('Error adding visit:', error);
        throw error;
      })
    );
  }
}
