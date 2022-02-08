export interface IDropDownItem {
  value: any;
  name: string;
  checked?: boolean;
  extra?: string;
  [key:string]: any;
}

export type DropDownTypes = 'multi' | 'single';

export type DropDownSizes = 'lg' | 'md';
