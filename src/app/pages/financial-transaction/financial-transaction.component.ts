import { ActivatedRoute } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { Component, inject, OnDestroy, signal, ViewEncapsulation } from '@angular/core';

import { NgxCurrencyDirective } from 'ngx-currency';
import { Observable, Subject, takeUntil } from 'rxjs';

import { CardComponent } from '../../components/card/card.component';
import { ButtonComponent } from '../../components/button/button.component';
import { ControlComponent } from '../../components/control/control.component';
import { TipoTransacao } from '../../shared/models/enums/tipo-transacao.enum';
import { FinancialTransactionService } from '../../shared/services/financial-transaction.service';
import { TransacaoFinanceira } from '../../shared/models/transacao-financeira.interface';

@Component({
  selector: 'app-financial-transaction',
  imports: [
    CardComponent,
    ButtonComponent,
    ControlComponent,
    NgxCurrencyDirective,
    FormsModule
  ],
  templateUrl: './financial-transaction.component.html',
  styleUrl: './financial-transaction.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class FinancialTransactionComponent implements OnDestroy {
  private destroy$ = new Subject<void>();

  private transacao: TransacaoFinanceira | undefined;

  tipoTransacao = signal<TipoTransacao | string>('');

  valor = signal<number>(0);

  transacaoService = inject(FinancialTransactionService);

  private route = inject(ActivatedRoute);

  constructor() {
    this.route.params.subscribe((params) => {
      const transacaoId = params['id'];
      if (transacaoId) {
        this.transacaoService.getById(transacaoId).pipe(
          takeUntil(this.destroy$)
        ).subscribe({
          next: (transacao) => {
            this.transacao = transacao;
            this.tipoTransacao.set(transacao.tipoTransacao);
            this.valor.set(transacao.valor);
          },
          error: error => console.error('Error getting transaction:', error)
        });
      }
    });
  }

  onSubmit(ngForm: NgForm): void {
    this.getEndpointAction().pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: () => {
        this.transacaoService.notifyTransacaoChanged();
        ngForm.resetForm({
          tipoTransacao: '',
          valor: 0
        });
        this.transacao = undefined;
      },
      error: error => console.error('Error saving transaction:', error)
    });
  }

  private getEndpointAction(): Observable<TransacaoFinanceira> {
    return this.transacao ? this.transacaoService.update({
      ...this.transacao,
      tipoTransacao: this.tipoTransacao(),
      valor: this.valor()
    }) :
    this.transacaoService.save({
      tipoTransacao: this.tipoTransacao(),
      valor: this.valor(),
      dataOperacao: new Date()
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
