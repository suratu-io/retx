import { AnyAction, Dispatch } from 'redux';
import { DependencyList, useEffect, useState } from 'react';
import { handle, inject } from './handlers';
import { SetTransactionIdentifier } from './types';
import { TransactionStatus } from '@retx/core';
import { inactiveStatus } from './controllers';

export function useTransaction(): [TransactionStatus, SetTransactionIdentifier] {
  const [status, setStatus] = useState(inactiveStatus);
  const setTxId: SetTransactionIdentifier = id => handle(id, setStatus);
  return [status, setTxId];
}

export function useTransactionEffect(
  cb: (status: TransactionStatus) => AnyAction,
  deps?: DependencyList,
  dispatch: Dispatch = a => a,
): TransactionStatus {
  const [status, setTx] = useTransaction();
  useEffect(() => {
    dispatch(setTx(cb(status)));
  }, deps);
  return status;
}

export function useInject(): [TransactionStatus, SetTransactionIdentifier] {
  const [status, setStatus] = useState(inactiveStatus);
  const setTxId: SetTransactionIdentifier = id => {
    const injected = inject(id);
    handle(injected, setStatus);
    injected.start(id);
    return injected;
  };
  return [status, setTxId];
}

export function useInjectEffect(
  cb: (status: TransactionStatus) => AnyAction,
  deps?: DependencyList,
  dispatch: Dispatch = a => a,
): TransactionStatus {
  const [status, setTx] = useInject();
  useEffect(() => {
    dispatch(setTx(cb(status)));
  }, deps);
  return status;
}
