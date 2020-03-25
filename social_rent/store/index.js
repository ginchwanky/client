import {
    createStore,
    applyMiddleware,
    combineReducers
} from 'redux'
import user from './reducers/user'

import thunk from 'redux-thunk'

const reducers = combineReducers({
    user
})

const store = createStore(
    reducers,
    applyMiddleware(thunk)
)

export default store