import {IMarketPlaceAttrs} from "@app/features/marketplace/interfaces/marketplace-attrs";

export enum EMarketPlaceStatus {
  FIXED_PRICE_SALE = 'fixed_price_sale',
  AUCTION_SALE = 'auction_sale'
}

export interface IMarketPlaceListItem {
  attrs: IMarketPlaceAttrs;
  status: EMarketPlaceStatus;
  readonly finished_date: string;
  readonly created_date: string;
  readonly id: string;
  readonly is_bid_exist: string;
  readonly nft_id: string;
  readonly price: number;
  readonly thumbnail_desktop: string;
  readonly thumbnail_mobile: string;
  // front-end internal
  days_left?: number | null;
  new?: boolean;
}
