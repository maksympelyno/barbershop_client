import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap } from 'rxjs';
import { AuthService } from './auth.service';
import { API_ENDPOINTS, BASE_URL } from '../constants/api-endpoints';
import { Visit, VisitDTO, VisitForm } from '../models/visit.model';

@Injectable({
  providedIn: 'root',
})
export class VisitsService {
  private authService = inject(AuthService);
  private baseUrl = BASE_URL + API_ENDPOINTS.VISIT;

  visits = signal<Visit[]>([]);

  constructor(private http: HttpClient) {}

  getVisitsByBranch(): void {
    this.http
      .get<Visit[]>(`${this.baseUrl}branch/${this.authService.getBranchId()}`)
      .subscribe((data) => this.visits.set(data));
  }

  addVisit(visit: VisitForm): Observable<Visit> {
    const visitPayload: VisitDTO = {
      client: visit.clientId,
      haircut: visit.haircutId,
      date: visit.date,
    };

    return this.http.post<Visit>(this.baseUrl, visitPayload).pipe(
      tap(() => this.getVisitsByBranch()),
      catchError((error) => {
        console.error('Error adding visit:', error);
        throw error;
      })
    );
  }
}
