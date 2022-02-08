export interface IToastData {
  state: 'success' | 'error' | 'info';
  header?: string;
  text?: string;
}
