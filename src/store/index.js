import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk'
import { composeWithDevTools } from "redux-devtools-extension";
import ecommerce from './ecommerce/reducer'

export const store = createStore(combineReducers({ 
    ecommerce,
 }),
composeWithDevTools(applyMiddleware(thunk)))

export default store