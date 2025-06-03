import { TipoTransacao } from './enums/tipo-transacao.enum';

export interface TransacaoFinanceira {
  id?: string;
  tipoTransacao: TipoTransacao | string;
  descricao?: string | undefined;
  tipoMovimentacao?: string | undefined;
  valor: number;
  dataOperacao: Date;
}
