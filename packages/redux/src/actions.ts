import { TransactionControllerAction } from './types';
import { injectAndStart } from './handlers';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type InjectActionCreator<A extends (...args: any[]) => any> = (
  ...args: Parameters<A>
) => TransactionControllerAction;

/* eslint-disable @typescript-eslint/no-explicit-any, space-before-function-paren */
export function bindInjectAction<A extends (...args: any[]) => any>(ac: A): InjectActionCreator<A> {
  return function(...args: Parameters<A>): TransactionControllerAction {
    return injectAndStart(ac(...(args as any[])));
  };
}
/* eslint-enable @typescript-eslint/no-explicit-any, space-before-function-paren */
