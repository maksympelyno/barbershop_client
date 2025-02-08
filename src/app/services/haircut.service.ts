import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
}
