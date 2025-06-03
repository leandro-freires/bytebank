import { Routes } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'bytebank-admin',
    component: DashboardComponent,
    children: [
      {
        path: 'transferencia',
        loadChildren: () =>
          import('./pages/financial-transaction/financial-transaction.routes')
            .then(m => m.FINANCIAL_TRANSACTION_ROUTES)
      }
    ]
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];
