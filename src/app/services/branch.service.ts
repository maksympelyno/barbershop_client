import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINTS, BASE_URL } from '../constants/api-endpoints';
import { Branch } from '../models/branch.model';

@Injectable({
  providedIn: 'root',
})
export class BranchService {
  private baseUrl = BASE_URL + API_ENDPOINTS.BRANCH;

  branches = signal<Branch[]>([]);

  constructor(private http: HttpClient) {
    this.getBranches().subscribe((data) => this.branches.set(data));
  }

  getBranches() {
    return this.http.get<Branch[]>(this.baseUrl);
  }
}
