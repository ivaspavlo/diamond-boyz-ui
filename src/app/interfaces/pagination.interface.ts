export interface IPagination<T> {
  count: number;
  next: string;
  prev: string;
  results: T[];
}
