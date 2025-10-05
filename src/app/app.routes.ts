import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./components/home/home').then((m) => m.Home),
  },
  {
    path: 'add-ride',
    loadComponent: () => import('./components/add-ride/add-ride').then((m) => m.AddRide),
  },
  {
    path: 'ride-list',
    loadComponent: () => import('./components/ride-list/ride-list').then((m) => m.RideList),
  },
];
