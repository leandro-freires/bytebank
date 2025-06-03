import { DatePipe, DecimalPipe, TitleCasePipe } from '@angular/common';
import { Component, computed, inject, input, OnDestroy, signal, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { CardComponent } from '../../components/card/card.component';
import { ButtonComponent } from '../../components/button/button.component';
import { TransacaoFinanceira } from '../../shared/models/transacao-financeira.interface';
import { TransacaoFinanceiraAgrupada } from './shared/model/transacao-agrupada.interface';
import { FinancialTransactionService } from '../../shared/services/financial-transaction.service';

@Component({
  selector: 'app-bank-statement',
  imports: [
    CardComponent,
    ButtonComponent,
    DatePipe,
    TitleCasePipe,
    DecimalPipe
  ],
  templateUrl: './bank-statement.component.html',
  styleUrl: './bank-statement.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class BankStatementComponent implements OnDestroy {
  private subscription!: Subscription;

  transacoes = input<TransacaoFinanceira[]>([]);

  transacoesAgrupadas = computed<TransacaoFinanceiraAgrupada[]>(() => {
    return this.groupByMonthAndYear(this.transacoes());
  });

  itemSelected = signal<string | undefined>(undefined);

  transacaoService = inject(FinancialTransactionService);

  private routerService = inject(Router);

  private groupByMonthAndYear(transacoes: TransacaoFinanceira[]): TransacaoFinanceiraAgrupada[] {
    const grupos = transacoes.reduce((acc, transacao) => {
      const data = new Date(transacao.dataOperacao);
      const mesAno = `${data.getFullYear()}-${String(data.getMonth() + 1).padStart(2, '0')}`;

      if (!acc[mesAno]) {
        acc[mesAno] = [];
      }
      acc[mesAno].push(transacao);
      return acc;
    }, {} as Record<string, TransacaoFinanceira[]>);

    return Object.entries(grupos)
      .sort((a, b) => b[0].localeCompare(a[0]))
      .map(([mesAno, transacoes]) =>
      ({
        mesAno,
        transacoes: transacoes.sort(
          (a, b) => new Date(b.dataOperacao).getTime() - new Date(a.dataOperacao).getTime()
        )
      })
    );
  }

  onItemSelected(id: string | undefined) {
    this.itemSelected.set(id);
  }

  onDeleteItem() {
    const selectedId = this.itemSelected();
    if (!selectedId) {
      console.warn('No item selected for editing');
      return;
    }

    this.subscription = this.transacaoService.delete(selectedId).subscribe({
      next: () => {
        this.transacaoService.notifyTransacaoChanged();
        this.itemSelected.set(undefined);
      }
    });
  }

  async onEditItem(): Promise<void> {
    const selectedId = this.itemSelected();
    if (!selectedId) {
      console.warn('No item selected for editing');
      return;
    }

    this.routerService.navigate(['transferencia', selectedId], { onSameUrlNavigation: 'reload' });
    this.itemSelected.set(undefined);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
