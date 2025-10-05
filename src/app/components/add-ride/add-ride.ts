import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Ride } from '../../services/ride';

@Component({
  selector: 'app-add-ride',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './add-ride.html',
  styleUrl: './add-ride.scss',
})
export class AddRide {
  rideForm!: FormGroup;
  router = inject(Router);
  rideService = inject(Ride);

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.rideForm = this.fb.group({
      employeeId: ['', Validators.required],
      vehicleType: ['', Validators.required],
      vehicleNo: ['', Validators.required],
      vacantSeats: ['', [Validators.required, Validators.min(1)]],
      time: ['', Validators.required],
      pickupPoint: ['', Validators.required],
      destination: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.rideForm.valid) {
      const formValues = this.rideForm.value;

      const [hours, minutes] = formValues.time.split(':').map(Number);

      const rideDateTime = new Date();
      rideDateTime.setHours(hours, minutes, 0, 0);

      const now = new Date();
      if (rideDateTime < now) {
        alert('Ride time cannot be in the past.');
        return;
      }

      const ride = {
        ...formValues,
        time: rideDateTime.toString(),
      };

      this.rideService.addRide(ride).subscribe(() => {
        alert('Ride added successfully!');
        this.router.navigate(['/ride-list']);
        this.rideForm.reset();
      });
    }
  }
}
