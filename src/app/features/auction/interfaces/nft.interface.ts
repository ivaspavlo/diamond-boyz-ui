// TODO: Update enum
export enum NFT_STATUS {
  BUY = 'buy_now_sale',
  AUCTION = 'auction_sale',
  OWNED = 'not_for_sale',
  VALIDATED = 'validated'
}

export enum AUCTION_STATUS {
  ACTIVE = 'active',
  COMPLETED = 'completed',
  CANCELED = 'canceled'
}

export enum AUCTION_TYPE {
  NFT = 'nft',
  TICKET  = 'ticket'
}

export enum AUCTION_OFFER_STATUS {
  ACTIVE = 'active',
  CANCELED = 'canceled',
  WINNER = 'winner'
}

export enum NFT_OBJECT_TYPE {
  TICKET = 'ticket',
  MERCH = 'merch',
  NFT = 'nft'
}

interface INftSale {
  created: string;
  finished_date: string;
  id: string;
  market_contract_item_id: number;
  nft_id: string;
  price: {
    dbz: number;
    usd: number;
  };
  status: string;
  txn_hash: string;
}

interface IMarketplace {
  auction: any;
  created_date: string;
  id: string;
  nft_sale: INftSale;
  status: string;
  market_contract_item_id?: string;
}

export interface INft {
  "status": NFT_STATUS, // TODO: recheck
  "contract_address": string,
  "token_id": string;
  "attrs": {[key: string]: unknown};
  created: string;
  id: string;
  marketplace: IMarketplace;
  object_id: string,
  object_type: NFT_OBJECT_TYPE, // TODO: enum
  owner: number; // TODO: UUID
  thumbnail_desktop: string;
  thumbnail_desktop_confirmation: string;
  thumbnail_mobile: string;
  event_id: number;
  finished_date: string;
  created_date: string;
  owner_wallet: string;
  zone_label: string;

  // front-end internal
  days_left?: number | null;
  new?: boolean;
}

export interface IAuction {
  "id": number,
  "object_id": number,
  "finished_date": string,
  "created": string,
  "min_bid": string,
  "status": AUCTION_STATUS,
  "object_type": AUCTION_TYPE,
  "start_price": string;
}

export interface IAuctionOffer {
  auction_id: string;
  bid: string;
  expiration_date: string;
  created_date: string;
  user_id: string;
  status: AUCTION_OFFER_STATUS
}
