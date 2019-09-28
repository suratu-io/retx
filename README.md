<h1 align="center">RET❎</h1>
<p align="center">Transaction control for <a href="https://github.com/reduxjs/redux">redux</a></p>

<p align="center">
  <a href="https://github.com/suratu-io/retx/actions?workflow=Node+CI">
    <img
      src="https://github.com/suratu-io/retx/workflows/Node%20CI/badge.svg"
      alt="Github Action Nodejs"
    >
  </a>
</p>

---

<p align="center">
    <strong><a href="#intro">Intro</a></strong>
    |
    <strong><a href="#usage">Usage</a></strong>
    |
    <strong><a href="#installation">Installation</a></strong>
    |
    <strong><a href="#license">License</a></strong>
</p>

---

<h2 id="intro">👋 Intro</h2>

Without react:
```typescript
// ...store is configured here.

const actionStart = { type: 'ACTION_START' };
const actionFulfill = { type: 'ACTION_FULFILL' };

const onStatusChange = status => /* do things with status */;

const action = handle(
  inject(actionStart), // `actionStart` is now an id for the transaction status.
                       // you should use it as an address because of transactions
                       // saved in a WeakMap.
  
  onStatusChange,      // onStatusChange is going to be called on every update
                       // that happened with its transaction state.
);

store.dispatch(action);                        // { pending: true,  state: "pending"   ... }
store.dispatch(action.fulfill(actionFulfill)); // { pending: false, state: "fulfilled" ... }
```

With FC:
```typescript
// Component.tsx
const actionStart = { type: 'ACTION_START' };

const Component: FC = () => {
  const dispatch = useDispatch();
  const [{ pending }, setInject] = useInject();
  
  useEffect(() => dispatch(setInject()), []);
  
  return pending ? 'Loading...' : <h1>Not loading</h1>;
};

// actions.ts in your favorite redux middleware
const ... = async (dispatch, action) => {
  try {
    const res = await someService();
    dispatch(action.fulfill(actionFulfill(res)));
  } catch (e) {
    dispatch(action.fail(actionFail(e), e));
  }
};
```


<h2 id="usage">🔧 Usage</h2>

### Getting started
All you need to do is to set the `transactionMiddleware` into your store:
```typescript
import { transactionMiddleware } from '@retx/redux';
import { applyMiddleware, createStore } from 'redux';

const store = createStore(
  rootReducer,
  //                                  ⬇️right here
  composeWithDevTools(applyMiddleware(transactionMiddleware)),
);
```
and `inject` transaction controller into your action in several available ways
that we are going to talk about next

### `inject`/`injectWithStart` and `handle`
`inject` requires an `action`, assigns transaction control functions
(`start`, `fulfill`, `fail`, `abort`, `next`) and returns it.
+ `handle` adds a new transaction update listener by the given transaction id (`object`).

Example:
```typescript
handle(
  inject({ type: 'START_OR_SOMETHING' }),
  status => // do things with status...
);
```


<h2 id="installation">⬇️ Installation</h2>

```bash
$ npm i @retx/{core,redux}
```


<h2 id="license">🔖 License</h2>

[MIT](LICENSE)
