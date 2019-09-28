import { TransactionIdentifier, TransactionStatus } from '../types';

export interface TransactionMap<W extends object = object> {
  get(id: TransactionIdentifier<W>): TransactionStatus | undefined;
  set(id: TransactionIdentifier<W>, status: TransactionStatus): void;
  pushHandlers(id: TransactionIdentifier<W>, ...handlers: TransactionUpdateHandler[]): void;
  refreshSchedules(id: TransactionIdentifier<W>): void;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TransactionStore<W extends object = object> extends TransactionMap<W> {}

export interface TransactionSnapshot {
  status: TransactionStatus;
  handlers: TransactionUpdateHandler[];
}

export interface TransactionUpdateHandler {
  (status: TransactionStatus): void;
}
