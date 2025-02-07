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
}
