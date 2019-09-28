import { TransactionController, TransactionalAction } from '../types';
import { abortStatus, failStatus, fulfillStatus, startStatus } from './types';
import { AnyAction } from 'redux';
import { inject } from '../handlers';
import { store } from '../store';

export const start = (id: TransactionalAction) => store.set(id, { ...startStatus });
export const abort = (id: TransactionalAction) => store.set(id, { ...abortStatus });
export const fulfill = (id: TransactionalAction) => store.set(id, { ...fulfillStatus });
export const fail = (id: TransactionalAction, error: Error) =>
  store.set(id, { ...failStatus, error });

export const mark = (id: TransactionalAction, target: AnyAction): AnyAction => (
  (target.__tx = id), target
);

export const createTransactionController = (id: TransactionalAction): TransactionController => ({
  abort: action => (abort(id), mark(id, action)),
  fulfill: action => (fulfill(id), mark(id, action)),
  start: action => (start(id), mark(id, action)),
  fail: (action, error) => (fail(id, error), mark(id, action)),
  next: action => inject(id as AnyAction, mark(id, action)),
});
