import { applyMiddleware, createStore } from 'redux'

// thunk allow us to perform async action
import thunk from 'redux-thunk'
import reducers from './reducers/index'

import { composeWithDevTools } from 'redux-devtools-extension'

const store = createStore(
  reducers,
  {},
  composeWithDevTools(applyMiddleware(thunk)),
)

export default store
