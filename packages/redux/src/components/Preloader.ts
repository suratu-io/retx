import { FC, ReactElement } from 'react';
import { TransactionStatus } from '@retx/core';

export interface PreloaderProps {
  status: TransactionStatus;
  pending(): ReactElement;
  error(error: Error): ReactElement;
  fulfill(aborted: boolean): ReactElement;
}

export const Preloader: FC<PreloaderProps> = props => {
  const { status } = props;

  if (status.error) return props.error(status.error);
  if (status.aborted) return props.fulfill(true);
  if (status.fulfilled) return props.fulfill(false);

  return props.pending();
};
