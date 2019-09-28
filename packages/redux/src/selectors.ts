import { TransactionStatus } from '@retx/core';
import { TransactionalAction } from './types';
import { store } from './store';

export const selectTransaction = (id: TransactionalAction): TransactionStatus | undefined =>
  store.get(id);
