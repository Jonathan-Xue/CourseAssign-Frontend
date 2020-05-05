import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import createRootReducer from './reducers';
import { verifyAuth } from "./actions/authActions";

export const history = createBrowserHistory({ basename: process.env.PUBLIC_URL });
export default function configureStore(preloadedState) {
	const store = createStore(
	    createRootReducer(history),
	    preloadedState,
	    compose(
	    	applyMiddleware(
	    		routerMiddleware(history),
	    		thunk,
	    		logger
	    	)
	    )
	)

	store.dispatch(verifyAuth());
	return store
};