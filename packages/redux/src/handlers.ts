import { TransactionControllerAction, TransactionalAction } from './types';
import { TransactionStatus, TransactionUpdateHandler } from '@retx/core';
import { AnyAction } from 'redux';
import { createTransactionController } from './controllers';
import { store } from './store';

export function promise(id: TransactionalAction): Promise<TransactionStatus> {
  return new Promise((resolve, reject) => {
    store.pushHandlers(id, status => {
      if (status.fulfilled) return resolve(status);
      if (status.error && !status.pending) return reject(status.error);
      else resolve(status);
    });
  });
}

export function handle<A extends TransactionalAction = TransactionalAction>(
  id: A,
  ...handlers: TransactionUpdateHandler[]
): A {
  store.pushHandlers(id, ...handlers);
  return id;
}

export function inject(id: AnyAction, target: AnyAction = id): TransactionControllerAction {
  const controller = createTransactionController(id);
  target.__tx = id;
  target.fulfill = controller.fulfill;
  target.start = controller.start;
  target.abort = controller.abort;
  target.fail = controller.fail;
  target.next = controller.next;
  return target as TransactionControllerAction;
}

export function injectAndStart(id: AnyAction, target: AnyAction = id): TransactionControllerAction {
  const action = inject(id, target);
  action.start(id);
  return action;
}
