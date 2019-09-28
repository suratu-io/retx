import { AnyAction } from 'redux';
import { TransactionIdentifier } from '@retx/core';

export interface TransactionController {
  start(action: AnyAction): AnyAction;
  abort(action: AnyAction): AnyAction;
  fulfill(action: AnyAction): AnyAction;
  next(action: AnyAction): AnyAction;
  fail(action: AnyAction, error: Error): AnyAction;
}

export type TransactionalAction = TransactionIdentifier<AnyAction>;

export interface TransactionControllerAction extends TransactionController, AnyAction {}

export interface WithTransaction {
  __tx: TransactionalAction;
}

export interface SetTransactionIdentifier {
  (action: AnyAction): AnyAction;
}
