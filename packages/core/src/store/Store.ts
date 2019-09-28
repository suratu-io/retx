import { TransactionIdentifier, TransactionStates, TransactionStatus } from '../types';
import { TransactionSnapshot, TransactionStore, TransactionUpdateHandler } from './types';

export const initStatus: TransactionStatus = {
  pending: false,
  aborted: false,
  inactive: true,
  fulfilled: false,
  state: TransactionStates.Inactive,
};

export class Store<W extends object = object> implements TransactionStore<W> {
  private readonly map = new WeakMap<TransactionIdentifier<W>, TransactionSnapshot>();
  private readonly schedules = new WeakMap<TransactionIdentifier<W>, TransactionSnapshot>();

  public get = (id: TransactionIdentifier<W>): TransactionStatus | undefined => {
    const snapshot = this.getSnapshot(id);
    return snapshot && snapshot.status;
  };

  public pushHandlers = (
    id: TransactionIdentifier<W>,
    ...handlers: TransactionUpdateHandler[]
  ): void => {
    const snapshot = this.getSnapshot(id);
    if (snapshot) {
      if (snapshot.status.state !== TransactionStates.Inactive) {
        handlers.forEach(n => n(snapshot.status));
      }
      snapshot.handlers = [...snapshot.handlers, ...handlers];
    } else {
      const validSnap = this.initSnapshot(id);
      validSnap.handlers = [...handlers];
    }
  };

  public set = (
    id: TransactionIdentifier<W>,
    status: Partial<TransactionStatus> = initStatus,
  ): void => {
    const snapshot = this.getSnapshot(id);
    if (snapshot) {
      this.updateSnapshot(id, status);
    } else {
      this.initSnapshot(id, status);
    }
  };

  public refreshSchedules = (id: TransactionIdentifier<W>) => {
    const snapshot = this.getSnapshot(id);
    if (snapshot) {
      this.map.set(id, snapshot);
      snapshot.handlers.forEach(n => n(snapshot.status));
    }
  };

  private updateSnapshot = (
    id: TransactionIdentifier<W>,
    status: Partial<TransactionStatus>,
  ): TransactionSnapshot => {
    const snapshot = this.getSnapshot(id);
    if (snapshot) {
      snapshot.status = {
        ...snapshot.status,
        ...status,
      };
    }
    return snapshot;
  };

  private initSnapshot = (
    id: TransactionIdentifier<W>,
    status: Partial<TransactionStatus> = initStatus,
  ): TransactionSnapshot => {
    const snapshot = this.buildSnapshot({ ...initStatus, ...status });
    this.schedules.set(id, snapshot);
    return snapshot;
  };

  private getSnapshot = (id: TransactionIdentifier<W>): TransactionSnapshot | undefined =>
    this.schedules.get(id);

  private buildSnapshot = (
    status: TransactionStatus,
    handlers: TransactionUpdateHandler[] = [],
  ): TransactionSnapshot => ({
    status,
    handlers,
  });
}
