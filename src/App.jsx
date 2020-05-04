import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import configureStore, { history } from './store';
import './App.scss';

import AppRoutes from "./AppRoutes";

const store = configureStore();
export default function App() {
    return (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <AppRoutes/>
            </ConnectedRouter>
        </Provider>
    );
};