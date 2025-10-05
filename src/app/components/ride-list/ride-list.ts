import { NgFor, NgIf } from '@angular/common';
import { Ride } from './../../services/ride';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-ride-list',
  templateUrl: './ride-list.html',
  styleUrls: ['./ride-list.scss'],
  imports: [NgFor, NgIf, ReactiveFormsModule, FormsModule],
})
export class RideList implements OnInit {
  allRides: Ride[] = [];
  rides: Ride[] = [];
  filterVehicle: string = '';

  constructor(private rideService: Ride) {}

  ngOnInit(): void {
    this.loadRides();
  }

  loadRides() {
    this.rideService.getRides().subscribe({
      next: (data) => {
        this.allRides = data;
        this.applyFilters();
      },
      error: (err) => {
        console.error('Error fetching rides:', err);
      },
    });
  }

  bookRide(ride: Ride, employeeId: string) {
    if (!employeeId) {
      alert('Please enter your Employee ID before booking.');
      return;
    }

    if (ride.employeeId === employeeId) {
      alert('You cannot book your own ride!');
      return;
    }

    if (ride.vacantSeats <= 0) {
      alert('No seats available!');
      return;
    }

    // ✅ Update vacant seats
    this.rideService.updateRide(ride.id!, { vacantSeats: ride.vacantSeats - 1 }).subscribe({
      next: (updatedRide) => {
        alert('Ride booked successfully!');
        this.loadRides(); // reload updated list
      },
      error: (err) => {
        console.error('Error booking ride:', err);
      },
    });
  }

  // Filtering logic
  applyFilters() {
    const now = new Date();

    this.rides = this.allRides.filter((ride) => {
      const rideDate = new Date(ride.time);

      // Only today’s rides
      const isToday = rideDate.toDateString() === now.toDateString();

      // ±60 mins
      const timeDiff = Math.abs(rideDate.getTime() - now.getTime()) / (1000 * 60);

      // Vehicle type filter
      const matchesVehicle = !this.filterVehicle || ride.vehicleType === this.filterVehicle;

      return isToday && timeDiff <= 60 && matchesVehicle;
    });
  }
}
