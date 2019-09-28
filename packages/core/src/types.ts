/**
 * @template W - generic type for weak reference transactions.
 */
export type TransactionIdentifier<W extends object = object> = W;

export interface TransactionStatus {
  pending: boolean;
  aborted: boolean;
  inactive: boolean;
  fulfilled: boolean;
  state: TransactionStates;
  error?: Error;
}

export enum TransactionStates {
  Inactive = 'inactive',
  Start = 'start',
  Abort = 'abort',
  Fulfill = 'fulfill',
  Fail = 'fail',
}
