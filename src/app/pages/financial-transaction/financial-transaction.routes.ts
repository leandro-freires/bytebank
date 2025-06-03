import { Routes } from '@angular/router';

import { FinancialTransactionComponent } from './financial-transaction.component';

export const FINANCIAL_TRANSACTION_ROUTES: Routes = [
  {
    path: '',
    component: FinancialTransactionComponent
  },
  {
    path: ':id',
    component: FinancialTransactionComponent
  }
];
