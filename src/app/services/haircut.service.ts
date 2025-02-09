import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HaircutsService {
  private baseUrl = 'http://localhost:5000/haircut';
  haircuts = signal<any[]>([]);

  constructor(private http: HttpClient) {}

  getHaircuts() {
    this.http
      .get<any[]>(this.baseUrl)
      .subscribe((data) => this.haircuts.set(data));
  }

  addHaircut(haircut: any) {
    this.http.post(this.baseUrl, haircut).subscribe(() => {
      this.getHaircuts();
    });
  }
  updateHaircut(id: string, updatedHaircut: any) {
    this.http.patch(`${this.baseUrl}/${id}`, updatedHaircut).subscribe(() => {
      this.getHaircuts();
    });
  }

  searchHaircuts(name: string): Observable<any[]> {
    const branchId = '67a21f6d48802d6c26909a87';
    return this.http.get<any[]>(
      `${this.baseUrl}/branch/${branchId}?name=${name}`
    );
  }

  getHaircutsByBranch(): Observable<any[]> {
    const branchId = '67a21f6d48802d6c26909a87';
    return this.http.get<any[]>(`${this.baseUrl}/branch/${branchId}`);
  }

  getHaicutsPriceHistory(haircutId: string) {
    return this.http.get<any[]>(`${this.baseUrl}/price-history/${haircutId}`);
  }
}
