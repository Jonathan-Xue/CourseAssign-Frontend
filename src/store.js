import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import createRootReducer from './reducers';
import { verifyAuth } from "./actions/authActions";

const logger = createLogger({
	collapsed: true
});

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