import { DatePipe, DecimalPipe, TitleCasePipe } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
  ViewEncapsulation
} from '@angular/core';

import { map, Subject, takeUntil } from 'rxjs';

import { HeaderComponent } from '../../components/header/header.component';
import { SideMenuComponent } from '../../components/side-menu/side-menu.component';
import { BankStatementComponent } from '../../ui/bank-statement/bank-statement.component';
import { FinancialTransactionService } from '../../shared/services/financial-transaction.service';
import { TransacaoFinanceira } from '../../shared/models/transacao-financeira.interface';
import { TipoTransacaoConfig } from '../../shared/models/enums/tipo-transacao.enum';

@Component({
  selector: 'app-dashboard',
  imports: [
    HeaderComponent,
    SideMenuComponent,
    BankStatementComponent,
    DatePipe,
    TitleCasePipe,
    RouterOutlet,
    DecimalPipe
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  today = signal<Date>(new Date());

  showBalanceValue = signal<boolean>(false);

  transacoes = signal<TransacaoFinanceira[]>([]);

  balanceValue = signal<number>(0);

  transacaoService = inject(FinancialTransactionService);

  ngOnInit(): void {
    this.getBankStatements();
    this.transacaoService.transachaoChanged$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => this.getBankStatements());
  }

  private getBankStatements(): void {
    this.transacaoService.getAll().pipe(
      map((responses: TransacaoFinanceira[]) => {
        return responses.map(response => {
          const enumValue = response.tipoTransacao as keyof typeof TipoTransacaoConfig;
          const config = TipoTransacaoConfig[enumValue];
          response.descricao = config?.descricao;
          response.tipoMovimentacao = config?.tipoMovimentacao;
          return response;
        });
      }),
      map((transacoes: TransacaoFinanceira[]) => {
        const valorTotal = transacoes.reduce((acc, transacao) => {
          const valor = transacao.valor ?? 0;
          return transacao.tipoMovimentacao === 'entrada'
            ? acc + valor
            : acc - valor;
        }, 0);
        return { transacoes, valorTotal };
      }),
      takeUntil(this.destroy$)
    ).subscribe({
      next: ({ transacoes, valorTotal }) => {
        this.transacoes.set(transacoes);
        this.balanceValue.set(valorTotal);
      },
      error: error => console.error('Error loading transactions:', error)
    });
  }

  onShowBalanceValue(): void {
    this.showBalanceValue.update(value => !value);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
