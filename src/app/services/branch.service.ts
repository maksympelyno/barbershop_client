import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BranchService {
  private baseUrl = 'http://localhost:5000/branch';
  branches = signal<any[]>([]);

  constructor(private http: HttpClient) {
    this.getBranches().subscribe((data) => this.branches.set(data));
  }

  getBranches() {
    return this.http.get<any[]>(this.baseUrl);
  }
}
