import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, Subject } from 'rxjs';

import { TransacaoFinanceira } from '../models/transacao-financeira.interface';

@Injectable({
  providedIn: 'root'
})
export class FinancialTransactionService {
  private API_URL = 'http://localhost:3000/transacoes';
  private transacaoChanged = new Subject<void>();

  get transachaoChanged$(): Observable<void> {
    return this.transacaoChanged.asObservable();
  }

  http = inject(HttpClient);

  getAll(): Observable<TransacaoFinanceira[]> {
    return this.http.get<TransacaoFinanceira[]>(this.API_URL);
  }

  getById(id: string): Observable<TransacaoFinanceira> {
    return this.http.get<TransacaoFinanceira>(`${this.API_URL}/${id}`);
  }

  save(transacao: Omit<TransacaoFinanceira, 'id'>): Observable<TransacaoFinanceira> {
    // Omit 'id' as json-server will generate it
    return this.http.post<TransacaoFinanceira>(this.API_URL, transacao);
  }

  update(transacao: TransacaoFinanceira): Observable<TransacaoFinanceira> {
    return this.http.put<TransacaoFinanceira>(`${this.API_URL}/${transacao.id}`, transacao);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }

  notifyTransacaoChanged(): void {
    this.transacaoChanged.next(); // Emit an event
  }
}
