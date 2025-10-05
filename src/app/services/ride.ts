import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Ride {
  id?: number;
  employeeId: string;
  vehicleType: string;
  vehicleNo: string;
  vacantSeats: number;
  time: string;
  pickupPoint: string;
  destination: string;
}

@Injectable({
  providedIn: 'root',
})
export class Ride {
  private apiUrl = 'https://68e2ab888e14f4523dab8214.mockapi.io/Rides';

  constructor(private http: HttpClient) {}

  getRides(): Observable<Ride[]> {
    return this.http.get<Ride[]>(this.apiUrl);
  }

  addRide(ride: Ride): Observable<Ride> {
    return this.http.post<Ride>(this.apiUrl, ride);
  }

  updateRide(id: number, ride: Partial<Ride>): Observable<Ride> {
    return this.http.patch<Ride>(`${this.apiUrl}/${id}`, ride);
  }
}
