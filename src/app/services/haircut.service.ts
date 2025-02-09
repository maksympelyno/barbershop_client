import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { API_ENDPOINTS, BASE_URL } from '../constants/api-endpoints';
import {
  CreateHaircutDto,
  Haircut,
  HaircutPriceHistory,
  UpdateHaircutDto,
} from '../models/haircut.model';

@Injectable({
  providedIn: 'root',
})
export class HaircutsService {
  private authService = inject(AuthService);
  private baseUrl = BASE_URL + API_ENDPOINTS.HAIRCUT;

  haircuts: WritableSignal<Haircut[]> = signal<Haircut[]>([]);

  constructor(private http: HttpClient) {}

  getHaircuts(): void {
    this.http
      .get<Haircut[]>(
        `${this.baseUrl}/branch/${this.authService.getBranchId()}`
      )
      .subscribe((data) => this.haircuts.set(data));
  }

  addHaircut(haircut: CreateHaircutDto): void {
    const branch: string = this.authService.getBranchId();
    const payload = { ...haircut, branch };

    this.http.post(this.baseUrl, payload).subscribe(() => {
      this.getHaircuts();
    });
  }

  updateHaircut(id: string, updatedHaircut: UpdateHaircutDto): void {
    this.http.patch(`${this.baseUrl}/${id}`, updatedHaircut).subscribe(() => {
      this.getHaircuts();
    });
  }

  searchHaircuts(name: string): Observable<Haircut[]> {
    const branchId: string = this.authService.getBranchId();
    return this.http.get<Haircut[]>(
      `${this.baseUrl}/branch/${branchId}?name=${name}`
    );
  }

  getHaircutsByBranch(): Observable<Haircut[]> {
    const branchId: string = this.authService.getBranchId();
    return this.http.get<Haircut[]>(`${this.baseUrl}/branch/${branchId}`);
  }

  getHaicutsPriceHistory(haircutId: string): Observable<HaircutPriceHistory[]> {
    return this.http.get<HaircutPriceHistory[]>(
      `${this.baseUrl}/price-history/${haircutId}`
    );
  }
}
