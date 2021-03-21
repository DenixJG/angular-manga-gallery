import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dashboard } from '../interfaces/Dashboard';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private DASHBOARD_URI = "/api/dashboard"

  constructor(private http: HttpClient) { }

  getDashboardInfo() {
    return this.http.get<Dashboard[]>(this.DASHBOARD_URI);
  }

}
