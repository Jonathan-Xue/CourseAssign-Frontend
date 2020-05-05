import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'

import authReducer from './authReducer.js';
import entryReducer from './entryReducer.js';
import courseReducer from './courseReducer.js';
import instructorReducer from './instructorReducer.js';
import matchReducer from './matchReducer.js';

const createRootReducer = (history) => combineReducers({
	router: connectRouter(history),
    auth: authReducer,
    entryRequests: entryReducer,
    courseRequests: courseReducer,
    instructorReducer: instructorReducer,
    match: matchReducer,
});

export default createRootReducer