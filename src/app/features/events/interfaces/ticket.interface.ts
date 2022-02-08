export enum SellType {
  FIXED_PRICE = 'fixed_price',
  AUCTION = 'auction'
}

export enum TicketStatus {
  ACTIVE = 'active',
  BOUGHT = 'bought',
  CANCELED = 'canceled'
}


export interface ITicket {
  id: number;
  sell_type: SellType;
  zone_id: number;
  zone_title: string;
  zone_label: string;
  title: string;
  price: string;
  price_usd: string;
  top_offer_price: number;
  thumbnail_desktop: string;
  thumbnail_desktop_marketplace_by_now: string;
  thumbnail_desktop_marketplace_by_now_confirmation: string;
  thumbnail_desktop_marketplace_details: string;
  thumbnail_desktop_ticket_details: string;
  thumbnail_mobile: string;
  auction_id: string | null;
  created_date: string;
  finished_sales_date: string;
  min_bid: string;
  state: TicketStatus;
  token_id: string;
  attrs: {[key: string]: unknown};
  // TODO: recheck types
  market_contract_item_id: string | null
}
