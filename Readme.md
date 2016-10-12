Redux Async Initial State
=============

Redux [middleware](http://redux.js.org/docs/advanced/Middleware.html) for async loading of initial app state.

[![build status](https://img.shields.io/travis/KELiON/redux-async-initial-state/master.svg?style=flat-square)](https://travis-ci.org/KELiON/redux-async-initial-state)
[![npm version](https://img.shields.io/npm/v/redux-async-initial-state.svg?style=flat-square)](https://www.npmjs.com/package/redux-async-initial-state)


```javascript
npm install --save redux-async-initial-state
```

## What? Why?

With [redux](http://redux.js.org) it is quite simple to synchronously load initial state, i.e. from localStorage:

```javascript
...
const initialState = JSON.parse(localStorage.getItem('state'));
const store = storeCreator(reducer, initialState);
```

But it becomes quite complicated to do it asynchronously, i.e. from server or from async storage, like in [React Native](https://facebook.github.io/react-native/docs/asyncstorage.html). This middleware do it for you.

## Usage

1. Add package

```javascript
npm install --save redux-async-initial-state
```

2. Change your reducer and add middleware:

before:

```javascript
import { createStore } from 'redux'
import * as reducers from 'reducers'

const reducer = combineReducers(reducers)
const store = createStore(reducer)
```

After

```javascript

import { createStore, applyMiddleware } from 'redux';
import * as reducers from 'reducers';
import * as asyncInitialState from 'redux-async-initial-state';

// We need outerReducer to replace full state as soon as it loaded
const reducer = asyncInitialState.outerReducer(combineReducers({
  ...reducers,
  // We need innerReducer to store loading state, i.e. for showing loading spinner
  // If you don't need to handle loading state you may skip it
  asyncInitialState: asyncInitialState.innerReducer,
}));

// Load state function
// Should return promise that resolves application state
const loadStore = () => {
  return new Promise(resolve => {
    fetch('/store')
      .then(response => response.json())
      .then(resolve);
  });
}

const storeCreator = applyMiddleware(asyncInitialState.middleware(loadStore));
const store = storeCreator(createStore)(reducer);
```

## Reducer
The shape of `innerReducer` is:

```javascript
{
  loaded: false,
  loading: false,
  error: false
}
```

You can add it to you reducer if you want to handle loading state, i.e. to show loading spinner. Here is React example (it uses reducer, described above):

```javascript
import { connect } from 'react-redux';

@connect(state => ({
  loading: state.asyncInitialState.loading,
}))
class MyComponent extends React.Component {
  render() {
    if (this.props.loading) {
      return <div>Loading...</div>
    }
    return ...;
  }
}
```
