import { TransactionStates, TransactionStatus } from '@retx/core';
import { initStatus } from '@retx/core';

export const inactiveStatus = { ...initStatus };

export const startStatus: TransactionStatus = {
  fulfilled: false,
  aborted: false,
  pending: true,
  inactive: false,
  state: TransactionStates.Start,
};

export const abortStatus: TransactionStatus = {
  fulfilled: false,
  aborted: true,
  pending: false,
  inactive: false,
  state: TransactionStates.Abort,
};

export const failStatus: TransactionStatus = {
  fulfilled: false,
  aborted: false,
  pending: false,
  inactive: false,
  state: TransactionStates.Fail,
};

export const fulfillStatus: TransactionStatus = {
  fulfilled: true,
  aborted: false,
  pending: false,
  inactive: false,
  state: TransactionStates.Fulfill,
};

export enum TransactionalActionTypes {
  Fail = '_FAIL',
  Abort = '_ABORT',
  Start = '_START',
  Fulfill = '_FULFILL',
}
