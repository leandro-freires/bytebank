import { TransacaoFinanceira } from '../../../../shared/models/transacao-financeira.interface';

export interface TransacaoFinanceiraAgrupada {
  mesAno: string;
  transacoes: TransacaoFinanceira[];
}
