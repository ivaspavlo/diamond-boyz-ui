export enum ENtfSaleStatus {
  PENDING = 'pending',
  ACTIVE = 'active',
  FINISHED = 'finished',
  CANCELLED = 'canceled',
  FAILED = 'failed'
}

export interface INtfSale {
  id: string;
  txn_hash: string;
  nft_id: string;
  price: string;
  finished_date: string;
  status: ENtfSaleStatus,
  created: string;
}
