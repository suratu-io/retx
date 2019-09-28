import { Middleware } from 'redux';
import { WithTransaction } from './types';
import { store } from './store';

export const transactionMiddleware: Middleware = () => next => action => {
  next(action);
  store.refreshSchedules((action as WithTransaction).__tx);
};
