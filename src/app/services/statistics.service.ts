import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINTS, BASE_URL } from '../constants/api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  private baseUrl = BASE_URL + API_ENDPOINTS.STATISTICS;

  revenue = signal<{ revenue: number } | null>(null);
  totalClients = signal<number | null>(null);
  totalVisits = signal<number | null>(null);
  popularHaircut = signal<{ name: string; count: number } | null>(null);
  averagePrice = signal<number | null>(null);

  constructor(private http: HttpClient) {}

  fetchStatistics(branchId: string): void {
    this.http
      .get<{ revenue: number }>(`${this.baseUrl}/${branchId}/revenue`)
      .subscribe((data) => this.revenue.set(data));

    this.http
      .get<number>(`${this.baseUrl}/${branchId}/clients`)
      .subscribe((data) => this.totalClients.set(data));

    this.http
      .get<number>(`${this.baseUrl}/${branchId}/visits`)
      .subscribe((data) => this.totalVisits.set(data));

    this.http
      .get<{ name: string; count: number }>(
        `${this.baseUrl}/${branchId}/popular-haircut`
      )
      .subscribe((data) => this.popularHaircut.set(data));

    this.http
      .get<number>(`${this.baseUrl}/${branchId}/average-price`)
      .subscribe((data) => this.averagePrice.set(data));
  }
}
