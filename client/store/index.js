import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {createLogger} from 'redux-logger';
import {reducer as formReducer} from 'redux-form';
import user from './auth';
import member from './user';
import goal from './goal';

const reducer = combineReducers({
    user,
    member,
    goal,
    form: formReducer
})

const middleware = composeWithDevTools(
    applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)

const store = createStore(reducer, middleware)

export default store
export * from './auth'
export * from './user'
export * from './goal'