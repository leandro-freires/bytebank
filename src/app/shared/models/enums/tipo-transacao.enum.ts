export enum TipoTransacao {
  DEPOSITO = 'DEPOSITO',
  PAGAMENTO = 'PAGAMENTO',
  TRANSFERENCIA = 'TRANSFERENCIA'
}

export const TipoTransacaoConfig = {
  [TipoTransacao.DEPOSITO]: { descricao: 'Depósito', tipoMovimentacao: 'entrada' },
  [TipoTransacao.PAGAMENTO]: { descricao: 'Pagamento', tipoMovimentacao: 'saida' },
  [TipoTransacao.TRANSFERENCIA]: { descricao: 'Transferência', tipoMovimentacao: 'saida' }
} as const;

