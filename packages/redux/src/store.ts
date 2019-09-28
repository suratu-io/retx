import { Store } from '@retx/core';
import { TransactionalAction } from './types';

export const store = new Store<TransactionalAction>();
